-- ============================================================
--  SQL الثالث | صفحة الطلاب + لوحة الإدارة الشاملة
--  THE LONG PASS
--  شغّل هذا الملف مرة واحدة في SQL Editor داخل Supabase
--  (كله آمن للتشغيل المتكرر: لا يحذف بيانات قائمة)
-- ============================================================

-- ------------------------------------------------------------
-- 0) دالة مساعدة: هل المستخدم الحالي هو الأدمن؟
--    (غيّر الإيميل هنا فقط إن غيّرته مستقبلاً)
-- ------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select (auth.jwt() ->> 'email') = 'winprowink@gmail.com'
$$;

-- ------------------------------------------------------------
-- 1) إعدادات الموقع (معلومات التواصل تُدار من لوحة التحكم)
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

insert into public.site_settings (id) values (1) on conflict (id) do nothing;

alter table public.site_settings enable row level security;

drop policy if exists "settings_select_all"   on public.site_settings;
drop policy if exists "settings_update_admin" on public.site_settings;

create policy "settings_select_all" on public.site_settings
  for select using (true);

create policy "settings_update_admin" on public.site_settings
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- 2) ملفات الطلاب (البروفايلات)
--    تُنشأ تلقائياً عند تسجيل أي حساب جديد
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text,
  avatar_url text,
  points int not null default 0,
  visits int not null default 0,
  last_visit_date date,
  is_banned boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_all"   on public.profiles;
drop policy if exists "profiles_insert_self"  on public.profiles;
drop policy if exists "profiles_update_rules" on public.profiles;
drop policy if exists "profiles_delete_admin" on public.profiles;

create policy "profiles_select_all" on public.profiles
  for select using (true);

create policy "profiles_insert_self" on public.profiles
  for insert to authenticated
  with check (auth.uid() = id);

-- التعديل: المستخدم يعدّل ملفه فقط (اسم/صورة)، والأدمن يعدّل الكل
create policy "profiles_update_rules" on public.profiles
  for update to authenticated
  using (auth.uid() = id or public.is_admin())
  with check (auth.uid() = id or public.is_admin());

create policy "profiles_delete_admin" on public.profiles
  for delete to authenticated
  using (public.is_admin());

-- حماية: الطالب لا يستطيع تعديل نقاطه أو حظر نفسه بنفسه
-- (حتى لا يلعب بالنقاط من أدوات المطور). نظام Supabase يشغّل الاستعلامات
-- بدور authenticated، ودوال security definer (مثل claim_daily_visit)
-- تعمل بدور postgres — لذا نسمح فقط عندما يكون التنفيذ داخل النظام أو من الأدمن.
create or replace function public.protect_profile()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  if not public.is_admin()
     and current_user in ('authenticated', 'anon', 'authenticator') then
    if new.points     is distinct from old.points
       or new.visits  is distinct from old.visits
       or new.is_banned is distinct from old.is_banned
       or new.last_visit_date is distinct from old.last_visit_date then
      raise exception 'لا يمكنك تعديل هذه الحقول بنفسك';
    end if;
  end if;
  return new;
end $$;

drop trigger if exists profiles_guard on public.profiles;
create trigger profiles_guard
  before update on public.profiles
  for each row execute function public.protect_profile();

-- إنشاء ملف شخصي تلقائياً عند التسجيل (يأخذ username من بيانات التسجيل)
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
declare uname text := coalesce(nullif(new.raw_user_meta_data ->> 'username', ''), 'user_' || substr(new.id::text, 1, 8));
begin
  while exists (select 1 from public.profiles where username = uname) loop
    uname := uname || '_' || substr(md5(random()::text), 1, 4);
  end loop;
  insert into public.profiles (id, username, display_name)
  values (new.id, uname, coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), uname))
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 3) منشورات صفحة الطلاب: شروحات / ملفات / فيديوهات
--    (النشر فيها للأدمن فقط، والقراءة للجميع)
-- ------------------------------------------------------------
create table if not exists public.student_posts (
  id bigint generated by default as identity primary key,
  title text not null,
  section text not null check (section in ('guides','files','videos')),
  content text,
  image_url text,
  video_url text,
  external_link text,
  attachments jsonb not null default '[]'::jsonb,
  downloads int not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists student_posts_created_at_idx
  on public.student_posts (created_at desc);

alter table public.student_posts enable row level security;

drop policy if exists "sposts_select_all"   on public.student_posts;
drop policy if exists "sposts_write_admin"  on public.student_posts;

create policy "sposts_select_all" on public.student_posts
  for select using (true);

create policy "sposts_write_admin" on public.student_posts
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- 4) الإعجابات (كل طالب يعجب بالمنشور مرة واحدة)
-- ------------------------------------------------------------
create table if not exists public.post_likes (
  post_id bigint not null references public.student_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (post_id, user_id)
);

alter table public.post_likes enable row level security;

drop policy if exists "likes_select_all"  on public.post_likes;
drop policy if exists "likes_insert_own"  on public.post_likes;
drop policy if exists "likes_delete_own"  on public.post_likes;

create policy "likes_select_all" on public.post_likes
  for select using (true);

create policy "likes_insert_own" on public.post_likes
  for insert to authenticated
  with check (auth.uid() = user_id and not exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_banned));

create policy "likes_delete_own" on public.post_likes
  for delete to authenticated
  using (auth.uid() = user_id);

-- +1 نقطة لأول إعجاب بكل منشور (إعجاب/إلغاء متكرر لا يعطي نقاط إضافية)
create or replace function public.award_like()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  perform public.award_points('like', (new.post_id)::text, 1);
  return new;
end $$;

create or replace function public.award_points(p_kind text, p_ref text, p_points int)
returns void
language plpgsql security definer
set search_path = public
as $$
declare uid uuid := auth.uid();
begin
  if uid is null or p_points = 0 then return; end if;

  insert into public.points_events (user_id, kind, ref_id, points)
  values (uid, p_kind, p_ref, p_points)
  on conflict (user_id, kind, ref_id) do nothing;

  if found then
    update public.profiles set points = points + p_points where id = uid;
  end if;
end $$;

-- منح نقاط المشاركة (مؤمّن: الطالب لا يستطيع تحديد النقاط بنفسه)
create or replace function public.award_share(p_post_id bigint)
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return; end if;
  perform public.award_points('share', p_post_id::text, 3);
end $$;

grant execute on function public.award_share(bigint) to authenticated;
revoke execute on function public.award_points(text, text, int) from public;
revoke execute on function public.award_points(text, text, int) from anon;
revoke execute on function public.award_points(text, text, int) from authenticated;

drop trigger if exists likes_award on public.post_likes;
create trigger likes_award
  after insert on public.post_likes
  for each row execute function public.award_like();

-- ------------------------------------------------------------
-- 5) التعليقات تحت المنشورات (صورة أو PDF مرفق اختياري)
-- ------------------------------------------------------------
create table if not exists public.comments (
  id bigint generated by default as identity primary key,
  post_id bigint not null references public.student_posts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  attachment jsonb, -- {name, path, size, type}
  created_at timestamptz not null default now()
);

create index if not exists comments_post_idx on public.comments (post_id, created_at);

alter table public.comments enable row level security;

drop policy if exists "comments_select_all"   on public.comments;
drop policy if exists "comments_insert_own"   on public.comments;
drop policy if exists "comments_delete_rules" on public.comments;

create policy "comments_select_all" on public.comments
  for select using (true);

create policy "comments_insert_own" on public.comments
  for insert to authenticated
  with check (auth.uid() = user_id and not exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_banned));

create policy "comments_delete_rules" on public.comments
  for delete to authenticated
  using (auth.uid() = user_id or public.is_admin());

create or replace function public.award_comment()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  perform public.award_points('comment', (new.id)::text, 2);
  return new;
end $$;

drop trigger if exists comments_award on public.comments;
create trigger comments_award
  after insert on public.comments
  for each row execute function public.award_comment();

-- ------------------------------------------------------------
-- 6) الدردشة العامة في صفحة الطلاب
-- ------------------------------------------------------------
create table if not exists public.chat_messages (
  id bigint generated by default as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text,
  attachment jsonb,
  created_at timestamptz not null default now(),
  check (content is not null or attachment is not null)
);

create index if not exists chat_created_idx on public.chat_messages (created_at desc);

alter table public.chat_messages enable row level security;

drop policy if exists "chat_select_all"   on public.chat_messages;
drop policy if exists "chat_insert_own"   on public.chat_messages;
drop policy if exists "chat_delete_rules" on public.chat_messages;

create policy "chat_select_all" on public.chat_messages
  for select using (true);

create policy "chat_insert_own" on public.chat_messages
  for insert to authenticated
  with check (auth.uid() = user_id and not exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_banned));

create policy "chat_delete_rules" on public.chat_messages
  for delete to authenticated
  using (auth.uid() = user_id or public.is_admin());

-- تفعيل التحديث الفوري للدردشة (إن لم تتوفر Realtime يستمر كل شيء بالتحميل العادي)
do $$
begin
  alter publication supabase_realtime add table public.chat_messages;
  alter publication supabase_realtime add table public.comments;
exception when others then null;
end $$;

-- ------------------------------------------------------------
-- 7) سجل النقاط (يمنع تكرار مكافأة نفس الفعل)
-- ------------------------------------------------------------
create table if not exists public.points_events (
  id bigint generated by default as identity primary key,
  user_id uuid not null references public.profiles(id) on delete cascade,
  kind text not null,          -- like / comment / share / daily / admin
  ref_id text,
  points int not null,
  created_at timestamptz not null default now(),
  unique (user_id, kind, ref_id)
);

alter table public.points_events enable row level security;

drop policy if exists "pevents_select_own" on public.points_events;
create policy "pevents_select_own" on public.points_events
  for select to authenticated
  using (auth.uid() = user_id or public.is_admin());

-- ------------------------------------------------------------
-- 8) نقاط الدخول اليومي: +2 نقطة مرة كل يوم عند دخول الصفحة
-- ------------------------------------------------------------
create or replace function public.claim_daily_visit()
returns void
language plpgsql security definer
set search_path = public
as $$
begin
  if auth.uid() is null then return; end if;
  update public.profiles
    set points = points + 2,
        visits = visits + 1,
        last_visit_date = current_date
    where id = auth.uid()
      and (last_visit_date is null or last_visit_date < current_date);
end $$;

-- ------------------------------------------------------------
-- 9) المستويات (الأدمن يستطيع تعديلها من لوحة التحكم)
--    الاسم يتغير تلقائياً حسب النقاط
-- ------------------------------------------------------------
create table if not exists public.levels (
  id int generated by default as identity primary key,
  min_points int not null unique,
  name text not null,
  icon text not null default '⭐'
);

alter table public.levels enable row level security;

drop policy if exists "levels_select_all"  on public.levels;
drop policy if exists "levels_write_admin" on public.levels;

create policy "levels_select_all" on public.levels
  for select using (true);

create policy "levels_write_admin" on public.levels
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

insert into public.levels (min_points, name, icon) values
  (0,   'المجنّد الجديد',     '🎖️'),
  (20,  'جنديّ الساحة',       '⚔️'),
  (50,  'صائد الإنجازات',     '🏹'),
  (100, 'محارب النخبة',       '🛡️'),
  (200, 'أسطورة الأكاديمية',  '👑')
on conflict (min_points) do nothing;

-- ------------------------------------------------------------
-- 10) لقب الأسبوع (أفضل متفاعل — يحدده الأدمن)
-- ------------------------------------------------------------
create table if not exists public.weekly_awards (
  id bigint generated by default as identity primary key,
  user_id uuid references public.profiles(id) on delete set null,
  title text not null default '🥇 أسطورة الأسبوع',
  week_label text,
  note text,
  created_at timestamptz not null default now()
);

alter table public.weekly_awards enable row level security;

drop policy if exists "awards_select_all"  on public.weekly_awards;
drop policy if exists "awards_write_admin" on public.weekly_awards;

create policy "awards_select_all" on public.weekly_awards
  for select using (true);

create policy "awards_write_admin" on public.weekly_awards
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ------------------------------------------------------------
-- 11) مخزن الطلاب student-media
--     صور + PDF فقط، بحد 3 ميغابايت للملف (حماية المساحة)
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'student-media', 'student-media', true,
  3145728, -- 3 ميغابايت
  array['image/jpeg','image/png','image/webp','image/gif','application/pdf']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "smedia_select_all"  on storage.objects;
drop policy if exists "smedia_insert_own"  on storage.objects;
drop policy if exists "smedia_update_own"  on storage.objects;
drop policy if exists "smedia_delete_rules" on storage.objects;

-- القراءة للجميع (الصور والتعليقات تظهر للزوار)
create policy "smedia_select_all" on storage.objects
  for select using (bucket_id = 'student-media');

-- الرفع: أي مستخدم مسجّل، في مجلده الخاص فقط (avatars/معرّفه أو attachments/معرّفه)
create policy "smedia_insert_own" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'student-media'
    and name ~ ('^(avatars|attachments)/')
    and name ~ ('^[a-z]+/' || auth.uid()::text || '(/|_)')
  );

create policy "smedia_update_own" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'student-media'
    and name ~ ('^(avatars|attachments)/')
    and name ~ ('^[a-z]+/' || auth.uid()::text || '(/|_)')
  ) with check (
    bucket_id = 'student-media'
    and name ~ ('^(avatars|attachments)/')
    and name ~ ('^[a-z]+/' || auth.uid()::text || '(/|_)')
  );

-- الحذف: المالك أو الأدمن
create policy "smedia_delete_rules" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'student-media'
    and (
      name ~ ('^(avatars|attachments)/')
      and name ~ ('^[a-z]+/' || auth.uid()::text || '(/|_)')
      or public.is_admin()
    )
  );

-- ============================================================
--  انتهى.  أعد تحميل صفحات الموقع بعد التشغيل.
-- ============================================================
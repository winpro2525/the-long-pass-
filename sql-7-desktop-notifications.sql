-- ==========================================================
--  الملف السابع: إشعارات الحاسوب (دفع لحظي)
--  الموقع: THE LONG PASS
--  شغّله في Supabase → SQL Editor (آمن للتكرار)
-- ==========================================================
--  ما يفعله:
--  1) يفعّل الإرسال الخارجي (pg_net) ويخزّن موضوع ntfy في site_config.
--  2) أي إشعار جديد في جدول notifications يُرسل فوراً إلى ntfy.sh،
--     فيصل إلى حاسوبك حتى لو كان الموقع مغلقاً.
--  3) رسائل «تواصل مع الأستاذ» تُنشئ إشعاراً للأدمن تلقائياً.
--  4) يضيف الجداول اللازمة إلى بث Realtime.
-- ==========================================================

create extension if not exists pg_net;

create table if not exists public.site_config (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);
alter table public.site_config enable row level security;
drop policy if exists site_config_read on public.site_config;
create policy site_config_read on public.site_config for select using (true);
drop policy if exists site_config_write on public.site_config;
create policy site_config_write on public.site_config for all
  using (public.is_admin()) with check (public.is_admin());

-- غيّر الرابط أدناه إلى موضوعك الخاص في ntfy (أي اسم تختاره)
insert into public.site_config(key, value)
values ('ntfy_topic', 'tlp-7322872906fa')
on conflict (key) do update set value = excluded.value, updated_at = now();

-- تعريف الأدمن
create or replace function public.admin_id()
returns uuid language sql stable security definer set search_path to public as $$
  select id from public.profiles where username = 'user_winprowink' limit 1
$$;

-- دفع كل إشعار إلى ntfy
create or replace function public.ntfy_push()
returns trigger language plpgsql security definer set search_path to public as $$
declare topic text;
begin
  select value into topic from public.site_config where key = 'ntfy_topic';
  if topic is null or topic = '' then return new; end if;

  perform net.http_post(
    url := 'https://ntfy.sh/',
    body := jsonb_build_object(
      'topic', topic,
      'title', coalesce(new.title, 'إشعار جديد'),
      'message', coalesce(left(new.body, 240), ''),
      'tags', jsonb_build_array('bell'),
      'priority', 3
    ),
    headers := jsonb_build_object('Content-Type', 'application/json'),
    timeout_milliseconds := 8000
  );
  return new;
end $$;

drop trigger if exists notifications_ntfy on public.notifications;
create trigger notifications_ntfy
after insert on public.notifications
for each row execute function public.ntfy_push();

-- إشعار الأدمن عند وصول رسالة خاصة من طالب
create or replace function public.notify_admin_contact()
returns trigger language plpgsql security definer set search_path to public as $$
declare nm text; aid uuid;
begin
  if new.from_admin then return new; end if;
  select coalesce(nullif(display_name, ''), username) into nm from public.profiles where id = new.user_id;
  aid := public.admin_id();
  if aid is null then return new; end if;
  insert into public.notifications (user_id, kind, title, body, ref_id)
  values (aid, 'contact', '✉️ رسالة خاصة من ' || coalesce(nm, 'طالب'), left(coalesce(new.body, ''), 140), new.user_id::text);
  return new;
end $$;

drop trigger if exists trg_notify_contact on public.admin_messages;
create trigger trg_notify_contact
after insert on public.admin_messages
for each row execute function public.notify_admin_contact();

-- بث لحظي
do $$
begin
  begin alter publication supabase_realtime add table public.notifications; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.submissions;   exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.admin_messages; exception when duplicate_object then null; end;
end $$;

-- ============================================================
--  انتهى.  افتح https://ntfy.sh/<الموضوع> في المتصفح وفعّل الإشعارات،
--  أو ثبّت تطبيق ntfy على الحاسوب واشترك بنفس الموضوع.
-- ============================================================

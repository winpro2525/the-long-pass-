-- ==========================================================
--  الملف السادس: الامتحانات · الواجبات · النتائج · التواصل الخاص
--  الموقع: THE LONG PASS — منطقة الطلاب
--  شغّله في Supabase → SQL Editor (آمن للتكرار)
-- ==========================================================

-- --------------------------------------------------------- 1) الامتحانات
create table if not exists public.exams (
    id          uuid primary key default gen_random_uuid(),
    title       text not null,
    lesson      text,
    max_score   smallint not null default 20 check (max_score in (5, 10, 20)),
    file        jsonb,                -- { path, name, type, size }  (أي صيغة)
    note        text,
    created_at  timestamptz not null default now()
);
create index if not exists exams_created_idx on public.exams (created_at desc);

-- --------------------------------------------------------- 2) رفع الطلاب (واجبات / امتحانات محلولة)
create table if not exists public.submissions (
    id          uuid primary key default gen_random_uuid(),
    kind        text not null default 'homework' check (kind in ('homework', 'exam')),
    title       text not null,
    subject     text,
    exam_id     uuid references public.exams(id) on delete set null,
    student_id  uuid not null references public.profiles(id) on delete cascade,
    file        jsonb,
    note        text,
    status      text not null default 'قيد المراجعة' check (status in ('قيد المراجعة', 'مقبول', 'يحتاج تعديل')),
    score       numeric,
    max_score   smallint check (max_score is null or max_score in (5, 10, 20)),
    created_at  timestamptz not null default now()
);
create index if not exists submissions_student_idx on public.submissions (student_id, created_at desc);
create index if not exists submissions_created_idx on public.submissions (created_at desc);

-- --------------------------------------------------------- 3) النتائج (يديرها الأدمن)
create table if not exists public.results (
    id          uuid primary key default gen_random_uuid(),
    item_kind   text not null check (item_kind in ('exam', 'homework', 'solution')),
    item_title  text not null,
    subject     text,
    student_id  uuid not null references public.profiles(id) on delete cascade,
    score       numeric,
    max_score   smallint not null default 20 check (max_score in (5, 10, 20)),
    effort      text check (effort in ('جيد', 'متوسط', 'رديء')),
    note        text,
    created_at  timestamptz not null default now()
);
create index if not exists results_student_idx on public.results (student_id, created_at desc);
create index if not exists results_created_idx on public.results (created_at desc);

-- --------------------------------------------------------- 4) التواصل الخاص مع الأستاذ
create table if not exists public.admin_messages (
    id          uuid primary key default gen_random_uuid(),
    user_id     uuid not null references public.profiles(id) on delete cascade,
    from_admin  boolean not null default false,
    body        text,
    attachment  jsonb,
    created_at  timestamptz not null default now()
);
create index if not exists admin_messages_user_idx on public.admin_messages (user_id, created_at);

-- ==========================================================
--                       الصلاحيات (RLS)
-- ==========================================================
alter table public.exams          enable row level security;
alter table public.submissions    enable row level security;
alter table public.results        enable row level security;
alter table public.admin_messages enable row level security;

-- الامتحانات: الجميع يقرأ، الأدمن يكتب
drop policy if exists exams_select_all on public.exams;
create policy exams_select_all on public.exams for select using (true);
drop policy if exists exams_admin_write on public.exams;
create policy exams_admin_write on public.exams for all using (public.is_admin()) with check (public.is_admin());

-- الواجبات: الطالب يرى ملفه (أو الأدمن يرى الكل) ويضيف لنفسه
drop policy if exists submissions_select on public.submissions;
create policy submissions_select on public.submissions for select
    using (public.is_admin() or student_id = auth.uid());
drop policy if exists submissions_insert on public.submissions;
create policy submissions_insert on public.submissions for insert
    with check (public.is_admin() or student_id = auth.uid());
drop policy if exists submissions_update on public.submissions;
create policy submissions_update on public.submissions for update
    using (public.is_admin() or student_id = auth.uid())
    with check (public.is_admin() or student_id = auth.uid());
drop policy if exists submissions_delete on public.submissions;
create policy submissions_delete on public.submissions for delete
    using (public.is_admin() or student_id = auth.uid());

-- النتائج: الجميع يقرأ (صفحة النتائج)، الأدمن يكتب
drop policy if exists results_select_all on public.results;
create policy results_select_all on public.results for select using (true);
drop policy if exists results_admin_write on public.results;
create policy results_admin_write on public.results for all using (public.is_admin()) with check (public.is_admin());

-- التواصل الخاص: صاحب المحادثة أو الأدمن
drop policy if exists admin_messages_select on public.admin_messages;
create policy admin_messages_select on public.admin_messages for select
    using (public.is_admin() or user_id = auth.uid());
drop policy if exists admin_messages_insert on public.admin_messages;
create policy admin_messages_insert on public.admin_messages for insert
    with check (public.is_admin() or (user_id = auth.uid() and from_admin = false));
drop policy if exists admin_messages_delete on public.admin_messages;
create policy admin_messages_delete on public.admin_messages for delete
    using (public.is_admin() or user_id = auth.uid());

-- ==========================================================
--                         الإشعارات
-- ==========================================================
-- إشعار لكل الطلاب عند نشر امتحان جديد
create or replace function public.notify_exam() returns trigger
language plpgsql security definer set search_path = public as $$
begin
    perform public.push_notification('exam',
        '📝 امتحان جديد: ' || new.title,
        coalesce('الدرس: ' || new.lesson, 'الدرجة من ' || new.max_score),
        new.id::text, null);
    return new;
end $$;
drop trigger if exists trg_notify_exam on public.exams;
create trigger trg_notify_exam after insert on public.exams
    for each row execute function public.notify_exam();

-- إشعار للطالب عند إضافة نتيجته
create or replace function public.notify_result() returns trigger
language plpgsql security definer set search_path = public as $$
begin
    insert into public.notifications(user_id, kind, title, body, ref_id)
    values (new.student_id, 'result',
        '📊 نتيجة جديدة: ' || new.item_title,
        coalesce(new.score::text || '/' || new.max_score, '') || coalesce(' · ' || new.effort, ''),
        new.id::text);
    return new;
end $$;
drop trigger if exists trg_notify_result on public.results;
create trigger trg_notify_result after insert on public.results
    for each row execute function public.notify_result();

-- إشعار للأدمن عند رفع الطالب واجباً
create or replace function public.notify_submission() returns trigger
language plpgsql security definer set search_path = public as $$
declare admin_id uuid;
begin
    select p.id into admin_id from public.profiles p
        join auth.users u on u.id = p.id
        where u.email = 'winprowink@gmail.com' limit 1;
    if admin_id is not null then
        insert into public.notifications(user_id, kind, title, body, ref_id)
        values (admin_id, 'submission',
            '📥 رفع جديد: ' || new.title,
            case when new.kind = 'exam' then 'امتحان محلول' else 'واجب' end,
            new.id::text);
    end if;
    return new;
end $$;
drop trigger if exists trg_notify_submission on public.submissions;
create trigger trg_notify_submission after insert on public.submissions
    for each row execute function public.notify_submission();

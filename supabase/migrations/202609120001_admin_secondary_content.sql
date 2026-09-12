create table if not exists public.event (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  event_type text,
  description text,
  location text,
  start_at timestamptz,
  end_at timestamptz,
  registration_url text,
  image_url text,
  publish_status text not null default 'draft'
    check (publish_status in ('draft', 'preview', 'published')),
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.grant (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  funder text,
  description text,
  amount numeric,
  currency text,
  deadline date,
  external_url text,
  status text not null default 'open'
    check (status in ('open', 'closed', 'awarded')),
  publish_status text not null default 'draft'
    check (publish_status in ('draft', 'preview', 'published')),
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.announcement (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  content text,
  publish_status text not null default 'draft'
    check (publish_status in ('draft', 'preview', 'published')),
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.event enable row level security;
alter table public.grant enable row level security;
alter table public.announcement enable row level security;

create policy "Public can read published events"
on public.event for select to anon, authenticated
using (publish_status = 'published' or public.is_admin());
create policy "Admins can create events"
on public.event for insert to authenticated
with check (public.is_admin());
create policy "Admins can update events"
on public.event for update to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete events"
on public.event for delete to authenticated
using (public.is_admin());

create policy "Public can read published grants"
on public.grant for select to anon, authenticated
using (publish_status = 'published' or public.is_admin());
create policy "Admins can create grants"
on public.grant for insert to authenticated
with check (public.is_admin());
create policy "Admins can update grants"
on public.grant for update to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete grants"
on public.grant for delete to authenticated
using (public.is_admin());

create policy "Public can read published announcements"
on public.announcement for select to anon, authenticated
using (publish_status = 'published' or public.is_admin());
create policy "Admins can create announcements"
on public.announcement for insert to authenticated
with check (public.is_admin());
create policy "Admins can update announcements"
on public.announcement for update to authenticated
using (public.is_admin()) with check (public.is_admin());
create policy "Admins can delete announcements"
on public.announcement for delete to authenticated
using (public.is_admin());

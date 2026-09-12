create extension if not exists pgcrypto;

create table public.admin (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid not null unique references auth.users(id) on delete cascade,
  name text not null,
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now()
);

create table public.research_area (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  description text,
  is_active boolean not null default true,
  publish_status text not null default 'draft' check (publish_status in ('draft', 'preview', 'published')),
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.researcher (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  position text,
  department text,
  email text,
  biography text,
  photo_url text,
  orcid text,
  google_scholar_url text,
  publish_status text not null default 'draft' check (publish_status in ('draft', 'preview', 'published')),
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  research_area_id uuid references public.research_area(id) on delete set null,
  title text not null,
  description text,
  objective text,
  status text not null default 'proposed' check (status in ('proposed', 'ongoing', 'completed', 'archived')),
  start_date date,
  end_date date,
  publish_status text not null default 'draft' check (publish_status in ('draft', 'preview', 'published')),
  last_updated_at timestamptz not null default now(),
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.publication (
  id uuid primary key default gen_random_uuid(),
  research_area_id uuid references public.research_area(id) on delete set null,
  project_id uuid references public.project(id) on delete set null,
  title text not null,
  publication_type text check (publication_type is null or publication_type in ('journal', 'conference', 'report')),
  year int check (year is null or year between 1900 and 2200),
  date_of_issue date,
  summary text,
  venue text,
  doi text,
  external_url text,
  publish_status text not null default 'draft' check (publish_status in ('draft', 'preview', 'published')),
  is_ijmr boolean not null default false,
  is_demo_data boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.researcher_research_area (
  researcher_id uuid not null references public.researcher(id) on delete cascade,
  research_area_id uuid not null references public.research_area(id) on delete cascade,
  primary key (researcher_id, research_area_id)
);

create table public.project_researcher (
  project_id uuid not null references public.project(id) on delete cascade,
  researcher_id uuid not null references public.researcher(id) on delete cascade,
  role text not null default 'team_member' check (role in ('lead', 'team_member')),
  primary key (project_id, researcher_id)
);

create table public.publication_author (
  publication_id uuid not null references public.publication(id) on delete cascade,
  researcher_id uuid not null references public.researcher(id) on delete cascade,
  author_order int not null default 1 check (author_order > 0),
  primary key (publication_id, researcher_id)
);

alter table public.researcher add column search_vector tsvector generated always as
  (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(biography, '') || ' ' || coalesce(department, ''))) stored;
alter table public.project add column search_vector tsvector generated always as
  (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '') || ' ' || coalesce(objective, ''))) stored;
alter table public.publication add column search_vector tsvector generated always as
  (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(summary, '') || ' ' || coalesce(venue, ''))) stored;

create index idx_researcher_search on public.researcher using gin (search_vector);
create index idx_project_search on public.project using gin (search_vector);
create index idx_publication_search on public.publication using gin (search_vector);
create index idx_project_area on public.project (research_area_id);
create index idx_publication_area on public.publication (research_area_id);
create index idx_publication_project on public.publication (project_id);

create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger researcher_set_updated_at before update on public.researcher
for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean language sql security definer set search_path = public stable as $$
  select exists (select 1 from public.admin where auth_user_id = auth.uid());
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

alter table public.admin enable row level security;
alter table public.research_area enable row level security;
alter table public.researcher enable row level security;
alter table public.project enable row level security;
alter table public.publication enable row level security;
alter table public.researcher_research_area enable row level security;
alter table public.project_researcher enable row level security;
alter table public.publication_author enable row level security;

create policy "Admins can read admin records" on public.admin for select to authenticated using (public.is_admin());
create policy "Public can read published research areas" on public.research_area for select to anon, authenticated using (publish_status = 'published' or public.is_admin());
create policy "Public can read published researchers" on public.researcher for select to anon, authenticated using (publish_status = 'published' or public.is_admin());
create policy "Public can read published projects" on public.project for select to anon, authenticated using (publish_status = 'published' or public.is_admin());
create policy "Public can read published publications" on public.publication for select to anon, authenticated using (publish_status = 'published' or public.is_admin());

create policy "Public can read published researcher area links" on public.researcher_research_area for select to anon, authenticated using (
  public.is_admin() or (
    exists (select 1 from public.researcher r where r.id = researcher_id and r.publish_status = 'published') and
    exists (select 1 from public.research_area a where a.id = research_area_id and a.publish_status = 'published')
  )
);
create policy "Public can read published project researcher links" on public.project_researcher for select to anon, authenticated using (
  public.is_admin() or (
    exists (select 1 from public.project p where p.id = project_id and p.publish_status = 'published') and
    exists (select 1 from public.researcher r where r.id = researcher_id and r.publish_status = 'published')
  )
);
create policy "Public can read published publication author links" on public.publication_author for select to anon, authenticated using (
  public.is_admin() or (
    exists (select 1 from public.publication p where p.id = publication_id and p.publish_status = 'published') and
    exists (select 1 from public.researcher r where r.id = researcher_id and r.publish_status = 'published')
  )
);

create policy "Admins manage research areas" on public.research_area for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage researchers" on public.researcher for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage projects" on public.project for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage publications" on public.publication for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage researcher area links" on public.researcher_research_area for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage project researcher links" on public.project_researcher for all to authenticated using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage publication author links" on public.publication_author for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select on public.research_area, public.researcher, public.project, public.publication,
  public.researcher_research_area, public.project_researcher, public.publication_author to anon;
grant select, insert, update, delete on all tables in schema public to authenticated;

create or replace function public.search_ecosystem(search_term text)
returns table(result_type text, id uuid, title text, description text, rank real)
language sql stable security invoker set search_path = public as $$
  select 'researcher', r.id, r.name, coalesce(r.position, r.department, ''), ts_rank(r.search_vector, websearch_to_tsquery('english', search_term))
  from public.researcher r where r.search_vector @@ websearch_to_tsquery('english', search_term)
  union all
  select 'project', p.id, p.title, coalesce(p.description, ''), ts_rank(p.search_vector, websearch_to_tsquery('english', search_term))
  from public.project p where p.search_vector @@ websearch_to_tsquery('english', search_term)
  union all
  select 'publication', p.id, p.title, coalesce(p.summary, ''), ts_rank(p.search_vector, websearch_to_tsquery('english', search_term))
  from public.publication p where p.search_vector @@ websearch_to_tsquery('english', search_term)
  order by 5 desc;
$$;

grant execute on function public.search_ecosystem(text) to anon, authenticated;

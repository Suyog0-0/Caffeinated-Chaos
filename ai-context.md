<!-- ai-context.md -->
# AI context

This is the Islington College Research & Development Digital Hub.

## Current milestone

- **Projects, People, and Publications pages** (`/projects`, `/projects/[slug]`, `/people`, `/people/[id]`, `/publications`) now read from Supabase (`publish_status = 'published'`).
- Other public pages (research-areas) still use dummy data from `lib/dummy-data.ts`.
- Supabase core schema and RLS migration are already deployed.
- Server Components use `src/supabase/client.ts` (`createClient`) for anon reads (simplification), **except the People, Publications, and Projects list pages, which now use `src/supabase/server.ts` (`createServerClient`)** — this is the correct client for Server Components and other pages should migrate to it too.
- **People page performance:** `/people`'s Supabase query was moved out of `page.tsx` into `components/people/person-results.tsx`, a Server Component wrapped in `<Suspense>`. This lets the hero and filter bar render instantly while the researcher grid streams in, instead of blocking the whole page behind the DB round trip. `/people/[id]` now sets `export const revalidate = 300` so individual profiles are cached for 5 minutes instead of re-fetched on every request.
- **Publications page performance:** `/publications` had `export const revalidate = 0`, forcing a fresh Supabase round trip (with a full join across authors/researchers/research area) on every single request even though the page takes no `searchParams` and all filtering/search/sorting happens client-side in `PublicationLibrary`. Changed to `revalidate = 300` so the page is cached and only re-queried at most every 5 minutes. No Suspense was added here — unlike `/people`, this page has no per-request dynamism, so ISR alone removes the bottleneck without adding a streaming boundary.
- **Projects page performance:** `/projects` had no `revalidate` set, so with Next 16's fetch-caching defaults it re-ran the join query (research area + project team) on every request even though `page.tsx` never reads `searchParams`. Added `revalidate = 300`, same pattern as Publications.
- **Projects page filters/sort/pagination (fixed):** `ProjectFilters` pushes `query`/`status`/`area`/`sort`/`page` into the URL. `ProjectList` is now a client component that reads those params with `useSearchParams` and does the filtering, sorting, and pagination itself (data is fetched once in `page.tsx`, small dataset, so client-side is simplest). Because `ProjectList` calls `useSearchParams`, `page.tsx` wraps it in `<Suspense>` (same requirement `ProjectFilters` already had).
  - Search matches `title`/`description`, case-insensitive.
  - Status filter matches `project.status` directly (`ongoing`/`completed`/`proposed`/`archived`).
  - Research area filter used to be 4 hardcoded slugs (`ai`, `data-science`, ...) that never matched real `research_area.slug` values from Supabase — that was the actual "filters not working" bug. `page.tsx` now selects `research_area(name, slug)` and builds `areaOptions` from the real projects returned, passed into `<ProjectFilters areaOptions={...} />`.
  - Sort dropdown had no `onChange` handler at all (did nothing) and an "Active Impact" option with no backing field. Replaced with two working options: `recent` (default, keeps the server's `created_at desc` order) and `az` (alphabetical by title).
  - Pagination: 6 projects per page, numbered page buttons + Prev/Next, driven by a `page` URL param. Any filter/search/sort change resets `page` back to 1.
- **Navbar now uses Poppins**, loaded via `next/font/google` directly in `site-header.tsx` (not the global site font).
- **Events (`/events`, `/events/[id]`) and Grants (`/grants`) added.** Both read from Supabase.
  - `event` and `grant` columns in this repo's migration files (`supabase/migrations/202609120001_admin_secondary_content.sql`) are **out of date vs. the live schema** — the live DB actually has more columns/tables than the migration files show (confirmed by inspecting the real schema directly), including a `public.event_speaker` join table (`event_id`, `researcher_id`) that isn't in any migration file here. Worth reconciling at some point so the migrations match reality.
  - Speakers: `/events` and `/events/[id]` join through `event_speaker` → `researcher(id, name, position)` for real speaker data — no fake/invented speaker fields.
  - **Remaining known gap:** grant "eligibility" (from the brief) has no column on `public.grant` (checked the live schema — only `title`, `funder`, `description`, `amount`, `currency`, `deadline`, `external_url`, `status`). `/grants` shows `description` only; add a real `eligibility` column via migration before displaying it separately.
  - `/events` lists upcoming events as cards (linking to `/events/[id]`) and past events as a plain list, split by comparing `start_at` to now.
  - `/events/[id]` shows the full description, formatted schedule (`start_at`–`end_at`), location, speakers (linking to `/people/[id]`), and a "Register" link to `registration_url` when present.
  - `/grants` is a single list page — no separate detail route. Each grant is a native `<details>/<summary>` that expands to show amount, description, and an "Apply now" link to `external_url` (only shown when `status = 'open'`).
- **Navbar font (fixed):** `SiteHeader`'s nav links, search link, and tagline hard-coded `font-[Arial,Helvetica,sans-serif]`, which fought the site's actual font stack (Geist via `font-sans` on `<html>`) and looked inconsistent with the rest of the editorial design. Removed the hard-coded override so the header just inherits the site's default font.
- The visual direction is editorial, minimal and Garamond-led.
- Do not use gradients or generic rounded-card layouts.
- Header is sticky and has no utility bar.
- Placeholder images come from `picsum.photos` (allowed in `next.config.ts`).
- Layout elements (Header, Footer) are in `components/layout/`.
- Use TailwindCSS for styling and shadcn (or similar UI libraries) where complex interactive UI is required.
- `components/ui/` holds minimal stubs for Input, Badge, Card, Separator until shadcn is installed.

## Component structure

### Projects
- `components/projects/projects-hero.tsx` — hero for the list page
- `components/projects/project-filters.tsx` — search + filter bar
- `components/projects/project-list.tsx` — renders a list of projects
- `components/projects/project-detail-hero.tsx` — hero for a single project
- `components/projects/project-overview.tsx` — objectives + linked publications
- `components/projects/project-sidebar.tsx` — team members + status

### People
- `components/people/people-hero.tsx` — hero for the list page
- `components/people/person-filters.tsx` — search + filter bar
- `components/people/person-results.tsx` — Server Component that runs the Supabase query and renders `PersonList`; suspended by `page.tsx`
- `components/people/person-list.tsx` — renders a list of researchers (pure presentational)
- `components/people/person-list-skeleton.tsx` — loading fallback shown while `person-results.tsx` is fetching
- `components/people/person-detail-hero.tsx` — (deprecated) inlined into people/[id]/page.tsx
- `components/people/person-overview.tsx` — (deprecated) inlined into people/[id]/page.tsx
- `components/people/person-sidebar.tsx` — (deprecated) inlined into people/[id]/page.tsx

## Routes

- `/` discovery homepage
- `/aboutsection` vision, mission, leadership and partners
- `/search` grouped dummy search results
- `/research-areas` and `/research-areas/[slug]`
- `/people` and `/people/[id]`
- `/projects` and `/projects/[slug]`
- `/publications` and `/publications/[id]`
- `/events` and `/events/[id]`
- `/grants` (list page only — each grant expands inline via `<details>`, no separate detail route)
- `/admin` and `/admin/login`

Next milestone: replace dummy arrays and wire admin authentication/CRUD.
Next milestone: replace remaining dummy arrays (research-areas) with Supabase reads and wire admin authentication/CRUD.
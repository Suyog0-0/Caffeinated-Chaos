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
- **Projects page performance:** `/projects` had no `revalidate` set, so with Next 16's fetch-caching defaults it re-ran the join query (research area + project team) on every request even though `page.tsx` never reads `searchParams`. Added `revalidate = 300`, same pattern as Publications. Note: `ProjectFilters` already pushes `status`/`area`/`query` into the URL, but neither `page.tsx` nor `ProjectList` currently reads those params to actually filter the list — this is a pre-existing gap, left as-is since fixing it is a functionality change, not a performance one.
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
- `/admin` and `/admin/login`

Next milestone: replace dummy arrays and wire admin authentication/CRUD.
Next milestone: replace remaining dummy arrays (research-areas) with Supabase reads and wire admin authentication/CRUD.
# AI context

This is the Islington College Research & Development Digital Hub.

## Current milestone

- **Projects and People pages** (`/projects`, `/projects/[slug]`, `/people`, `/people/[id]`) now read from Supabase (`publish_status = 'published'`).
- Other public pages (research-areas, publications) still use dummy data from `lib/dummy-data.ts`.
- Supabase core schema and RLS migration are already deployed.
- Server Components use `src/supabase/server.ts` (`createServerClient`) for anon reads.
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
- `components/people/person-list.tsx` — renders a list of researchers
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

Next milestone: replace remaining dummy arrays (research-areas, publications) with Supabase reads and wire admin authentication/CRUD.

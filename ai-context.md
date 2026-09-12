# AI context

This is the Islington College Research & Development Digital Hub.

## Current milestone

- **Projects, People and Research Areas pages** (`/projects`, `/projects/[slug]`, `/people`, `/people/[id]`, `/research-areas`, `/research-areas/[slug]`) now read from Supabase (`publish_status = 'published'`).
- Other public pages (publications) still use dummy data from `lib/dummy-data.ts`.
- Research areas listing has working search/status/sort filters (like Publications); Projects/People filter bars are still visual placeholders.
- Supabase core schema and RLS migration are already deployed.
- Server Components use `src/supabase/client.ts` (`createClient`) for anon reads (simplification).
- The visual direction is editorial, minimal and Garamond-led.
- Do not use gradients or generic rounded-card layouts.
- Header is sticky and has no utility bar.
- Placeholder images come from `picsum.photos` (allowed in `next.config.ts`).
- Layout elements (Header, Footer) are in `components/layout/`.
- Use TailwindCSS for styling and shadcn (or similar UI libraries) where complex interactive UI is required.
- `components/ui/` holds minimal stubs for Input, Badge, Card, Separator until shadcn is installed.

## Component structure

### About
- `components/about/about-hero.tsx` — hero for `/aboutsection`
- `components/about/impact-stats.tsx` — 4-number "Our impact" strip, static data (no Supabase)
- `components/about/mission-statements.tsx` — vision + mission cards
- `components/about/leadership.tsx` — leadership grid
- `components/about/partners.tsx` — partner categories

### Research Areas

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

### Research Areas
- `components/research_area/research-area-detail-header.tsx` — hero for a single area, now matches `publication-detail-hero.tsx` exactly; fact list shows only real `research_area` fields (`Status` from `is_active`), not computed project/publication counts
- `components/research_area/research-area-projects.tsx` — projects linked to the area, rendered as rounded editorial cards matching `publication-overview.tsx`'s "Related project" card (props: `projects`)
- `components/research_area/research-area-filters.tsx` — search bar + status/sort controls
- `components/research_area/research-area-directory.tsx` — renders each area as a rounded editorial card (12-col grid: index, title+desc, stats, arrow CTA)
- `components/research_area/research-area-detail-header.tsx` — hero for a single area, breadcrumb styled like `publication-detail-hero.tsx` (no "lead" field — not in schema)
- `components/research_area/research-area-projects.tsx` — projects linked to the area (props: `projects`)
- `components/research_area/research-area-sidebar.tsx` — linked researchers ("People") styled like `publication-sidebar.tsx`'s "Authors" list (icon heading, `size-9` avatars) + linked publications ("Recent outputs") (props: `researchers`, `publications`)


## Routes

- `/` discovery homepage
- `/aboutsection` vision, mission, leadership and partners
- `/search` grouped dummy search results
- `/research-areas` and `/research-areas/[slug]`
- `/people` and `/people/[id]`
- `/projects` and `/projects/[slug]`
- `/publications` and `/publications/[id]`
- `/admin` and `/admin/login`

Next milestone: replace remaining dummy arrays (publications) with Supabase reads and wire admin authentication/CRUD.

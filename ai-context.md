# AI context

This is the Islington College Research & Development Digital Hub.

## Current milestone

- **Projects pages** (`/projects`, `/projects/[slug]`) now read from Supabase (`publish_status = 'published'`).
- Other public pages still use dummy data from `lib/dummy-data.ts`.
- The admin milestone now includes a Supabase Auth login, an admin-only route
  boundary, a live overview, and researcher CRUD.
- Admin surfaces use the IJMR logo from `public/ijmr-logo-white.svg`.
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

## Routes

- `/` discovery homepage
- `/aboutsection` vision, mission, leadership and partners
- `/search` grouped dummy search results
- `/research-areas` and `/research-areas/[slug]`
- `/people` and `/people/[id]`
- `/projects` and `/projects/[slug]`
- `/publications` and `/publications/[id]`
- `/admin` overview
- `/admin/login` Supabase Auth login
- `/admin/researchers` live, searchable researcher directory with create,
  edit, confirmed permanent-delete flows, and server-side pagination
- `/admin/projects`, `/admin/publications`, `/admin/events`, `/admin/grants`,
  `/admin/announcements`, and `/admin/research-areas` empty states

Researcher CRUD is connected. The remaining admin sections stay read-only until
their CRUD flows are explicitly requested. All mutations must re-check admin
authorization server-side and continue to rely on Supabase RLS.

## Admin rendering

- Authenticated admin routes use request-time SSR because access depends on the
  Supabase session cookie and current role.
- Overview and researcher data load in async Server Components behind granular
  Suspense skeletons.
- Interactive navigation, forms, login state, delete confirmation, and error
  retry are the only Client Components.
- Researcher forms keep local field state after validation or database errors,
  accept any valid HTTP(S) profile URL in the Scholar field, and lazily preview
  photo URLs.
- Admin authentication uses verified JWT claims before the admin-table role
  lookup to avoid an unnecessary Auth user-request on supported Supabase JWTs.
- Static empty-state page content stays server-rendered and route-level code
  splitting provides lazy loading; do not force SSG for authenticated routes.

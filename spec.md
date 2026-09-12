<!-- spec.md -->
# UI specification

## Goal

Provide a responsive research-discovery website where visitors can move between research areas, researchers, projects and publications.

## Design

- Garamond typography for editorial character.
- Forest green, paper white, warm grey and a small yellow accent.
- No gradients.
- Sticky navigation.
- Clear lists and rules instead of repeated SaaS cards.
- Documentary images are used only where they add context.
- Use TailwindCSS and shadcn components while preserving the minimal editorial design.

## Page status

All public pages and the admin/login views exist with dummy content. Directory filters and admin buttons are visual placeholders. Supabase data, authentication and write actions are intentionally deferred to the next milestone.
- Documentary images are used only where they add context (picsum.photos placeholders for now).
- Use TailwindCSS and shadcn components while preserving the minimal editorial design.

## Component naming convention

Components for a feature live flat under `components/<feature>/`:
- List-page components: `components/projects/projects-hero.tsx`, `project-filters.tsx`, `project-list.tsx`
- Detail-page components: `components/projects/project-detail-hero.tsx`, `project-overview.tsx`, `project-sidebar.tsx`

The `components/people` feature follows the same pattern:
- List-page components: `components/people/people-hero.tsx`, `person-filters.tsx`, `person-list.tsx`
- Detail-page components: (inlined into page.tsx for surgical updates)

Same pattern applies to other features (research-areas, publications).

## Page status

All public pages and the admin/login views exist with dummy content from `lib/dummy-data.ts`. Directory filters and admin buttons are visual placeholders. Supabase data, authentication and write actions are intentionally deferred to the next milestone.

## People page performance

- `/people` streams: the hero and filter bar render immediately; the researcher grid is fetched in `components/people/person-results.tsx` and streamed in via `<Suspense>`, with `person-list-skeleton.tsx` as the loading placeholder.
- `/people` and `/people/[id]` use `src/supabase/server.ts` (`createServerClient`), not the browser client, since they run only on the server.
- `/people/[id]` sets `revalidate = 300` (5 minutes) so a given researcher's profile is cached instead of re-querying Supabase on every visit.

## Publications page performance

- `/publications` fetches the full published list once per request and filters/sorts it entirely client-side in `PublicationLibrary` — there's no `searchParams` or per-request dynamism, so the page is now cached with `revalidate = 300` instead of forcing a fresh Supabase query every time (`revalidate = 0` previously).
- Uses `src/supabase/server.ts` (`createServerClient`) instead of the browser client.

## Projects page performance

- `/projects` now sets `revalidate = 300` — the list query (project + research area + project team) doesn't depend on `searchParams`, so it's cached instead of re-fetched on every request.
- Uses `src/supabase/server.ts` (`createServerClient`) instead of the browser client.
- `ProjectFilters` updates the URL query string, but the list is not currently filtered by it server- or client-side; this was already the case before this change and was left alone.
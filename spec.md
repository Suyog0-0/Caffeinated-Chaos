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

## Projects page filters, sort and pagination

- `ProjectFilters` writes `query`, `status`, `area`, `sort` and `page` into the URL query string.
- `ProjectList` reads those params (`useSearchParams`) and filters/sorts/paginates the full project list client-side, 6 projects per page, with numbered pagination buttons.
- Research area options in the filter dropdown are built from the real `research_area` rows returned by Supabase (not hardcoded), so the filter always matches actual data.
- Sort has two options: "Recently Added" (default, server order) and "Alphabetical (A–Z)".

## Navbar

- Nav links, the search link, and the header tagline use the site's default font (no hard-coded font override).
- Header font is Poppins (`next/font/google`, loaded in `site-header.tsx`).
- Nav includes: Research areas, People, Projects, Publications, Events, Grants, About R&D.

## Events

- `/events` — upcoming events (cards, linking to `/events/[id]`) and past events (plain list), split by comparing `start_at` to the current time.
- `/events/[id]` — description, formatted schedule (`start_at`–`end_at`), location, speakers (via `event_speaker` → `researcher`, each linking to `/people/[id]`), and a "Register" link to `registration_url` when present.
- Data comes straight from `public.event` / `public.event_speaker` — no schema changes.

## Grants

- `/grants` — single list page, no separate detail route. Each grant is a `<details>/<summary>` that expands to show amount, description, and an "Apply now" link to `external_url` (only when `status = 'open'`). Status badge shown for `open` / `closed` / `awarded`.
- No `eligibility` column exists on `public.grant` — not shown as a separate field (would need a migration to add it properly).
- Hero has a 3-number stat row (Total grants / Open now / Awarded), counted client-side from the fetched list.
- Each `<summary>` row is a 12-col grid: deadline (left), title + funder + status badge (middle), amount (right) — visual only, same expand/collapse behavior.

## Events UI

- Upcoming event cards are full-width rows with a month/day date block on the left instead of a 2-column card grid.
- Section headings ("Upcoming" / "Past events") show a live count ("N scheduled" / "N archived").
- Past events render as one bordered list with a small initial-letter icon per row instead of a plain divided list.
- `/events` has a sticky filter bar (search + event-type + research-area dropdowns, plus All/Upcoming/Past chips), same URL-param pattern as `/projects`' `ProjectFilters`/`ProjectList`. Filtering runs client-side in `EventList`; `page.tsx` just fetches and passes data down.
- No filter for attendance mode (in-person/hybrid/virtual) — `public.event` has no column for it.

## Event detail page

- `/events/[id]` follows the same hero + sticky-sidebar grid as `/projects/[slug]`.
- Hero (`EventDetailHero`): dark background, breadcrumb, event-type + research-area pills, large serif title, icon-led date/time/location row.
- Sidebar (`EventSidebar`, `lg:sticky lg:top-24`): registration CTA card, event-details card (date/time/location), speakers card (photo when `researcher.photo_url` is set, else initials avatar; name + position, linking to `/people/[id]`).
- Main column: just the description — speaker info lives only in the sidebar to avoid repeating it twice on the page.
- **Related publications:** shown only when the event has a linked `project_id` and that project has published publications (`publication.project_id` match — there's no direct event↔publication link in the schema). Rendered as a divided list of rows (type/year kicker, serif title with a hover-reveal arrow, authors · venue), matching `ProjectOverview`'s publications list pattern.
- Hero kicker (event type / research area) is a plain uppercase mono line, dot-separated, no pill background — kept deliberately plain rather than a rounded chip badge.
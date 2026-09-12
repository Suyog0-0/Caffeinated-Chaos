<!-- spec.md -->
# UI specification

## Goal

Provide a responsive research-discovery website where visitors can move between research areas, researchers, projects and publications.

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
- **Navbar font (fixed):** `SiteHeader`'s nav links, search link, and tagline hard-coded `font-[Arial,Helvetica,sans-serif]`, which fought the site's actual font stack (Geist via `font-sans` on `<html>`) and looked inconsistent with the rest of the editorial design. Removed the hard-coded override so the header just inherits the site's default font.
- **Ethics page (fixed):** `/ethics` (`components/ethics/policy-section.tsx`) was already coded to read from a Supabase table called `ethics_policy`, but that table was never created in any migration, so the query silently failed and the section rendered empty. Added `supabase/migrations/202609120002_ethics_policy.sql` (same shape as `admin_secondary_content.sql`: `publish_status` + admin RLS policies). `policy-section.tsx` is now a client component with a "Download PDF" button (via `jspdf`) that generates a PDF from each policy's title/content on the fly, in addition to the existing `file_url` external-link download. The rest of `/ethics` — `sop-list.tsx`, `ai-principles.tsx`, `irb-committee.tsx`, `integrity-disclosures.tsx`, `review-tiers.tsx`, `ethics-hero.tsx` — is still fully static/hardcoded, not wired to Supabase.
- The visual direction is editorial, minimal and Garamond-led.
- Do not use gradients or generic rounded-card layouts.
- Header is sticky and has no utility bar.
- Placeholder images come from `picsum.photos` (allowed in `next.config.ts`).
- Layout elements (Header, Footer) are in `components/layout/`.
- Use TailwindCSS for styling and shadcn (or similar UI libraries) where complex interactive UI is required.
- `components/ui/` holds minimal stubs for Input, Badge, Card, Separator until shadcn is installed.

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
- Sidebar (`EventSidebar`, `lg:sticky lg:top-24`): registration CTA card, event-details card (date/time/location), speakers card (initials avatar + name + position, linking to `/people/[id]`).
- Main column: just the description — speaker info lives only in the sidebar to avoid repeating it twice on the page.
- **Related publications:** shown only when the event has a linked `project_id` and that project has published publications (`publication.project_id` match — there's no direct event↔publication link in the schema). Rendered as a divided list of rows (type/year kicker, serif title with a hover-reveal arrow, authors · venue), matching `ProjectOverview`'s publications list pattern.
- Hero kicker (event type / research area) is a plain uppercase mono line, dot-separated, no pill background — kept deliberately plain rather than a rounded chip badge.

## Events list redesign (`/events`)

- Upcoming events render as a single divided list (mono date column on the left, content, actions on the right) instead of individually bordered/shadowed cards — same "rules instead of cards" principle as the rest of the site.
- Event type / research area shown as one plain mono kicker line, matching the detail page's hero treatment — no pill badges.
- Primary CTA is context-aware: **Register** (solid) when `registration_url` exists, with **View details** as a secondary text link + arrow; when there's no registration link, **View details** is the solid primary button.
- Past events render as `date | title` archive rows (mono date, serif title, hover-reveal arrow) — no avatar-initial circles.
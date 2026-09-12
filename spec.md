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

Projects, People and Research Areas pages read from Supabase, and Research Areas also has working search/status/sort filters and restyled editorial cards (rounded, 12-col grid matching the reference design). Publications and the admin/login views still use dummy content. Directory filters and admin buttons are visual placeholders except on Research Areas and Publications, which are wired up. Supabase authentication and write actions are intentionally deferred to the next milestone.

## Component naming convention

Components for a feature live flat under `components/<feature>/`:
- List-page components: `components/projects/projects-hero.tsx`, `project-filters.tsx`, `project-list.tsx`
- Detail-page components: `components/projects/project-detail-hero.tsx`, `project-overview.tsx`, `project-sidebar.tsx`

The `components/people` feature follows the same pattern:
- List-page components: `components/people/people-hero.tsx`, `person-filters.tsx`, `person-list.tsx`
- Detail-page components: (inlined into page.tsx for surgical updates)

Same pattern applies to other features (research-areas, publications).

## Page status

Projects, People and Research Areas pages read from Supabase. Publications and the admin/login views still use dummy content from `lib/dummy-data.ts`. Directory filters and admin buttons are visual placeholders. Supabase authentication and write actions are intentionally deferred to the next milestone.

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

Same pattern applies to other features (research-areas, people, publications).

## Page status

All public pages and the admin/login views exist with dummy content from `lib/dummy-data.ts`. Directory filters and admin buttons are visual placeholders. Supabase data, authentication and write actions are intentionally deferred to the next milestone.

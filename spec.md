# UI specification

## Goal

Provide a responsive research-discovery website where visitors can move between research areas, researchers, projects and publications.

## Design

- Garamond typography for editorial character.
- Forest green, paper white, warm grey and a small yellow accent.
- No gradients.
- Sticky navigation.
- Clear lists and rules instead of repeated SaaS cards.
- Documentary images are used only where they add context (picsum.photos placeholders for now).
- Use TailwindCSS and shadcn components while preserving the minimal editorial design.

## Component naming convention

Components for a feature live flat under `components/<feature>/`:
- List-page components: `components/projects/projects-hero.tsx`, `project-filters.tsx`, `project-list.tsx`
- Detail-page components: `components/projects/project-detail-hero.tsx`, `project-overview.tsx`, `project-sidebar.tsx`

Same pattern applies to other features (research-areas, people, publications).

## Page status

Public pages remain as previously documented. The admin area now has:

- Supabase email/password login at `/admin/login`.
- Server-side admin role checks against `admin.auth_user_id` for all dashboard routes.
- A responsive navy sidebar with the yellow active-page accent.
- The admin interface uses the same sans-serif font system as the public home
  page and includes a new-tab link back to the public site.
- IJMR branding on the login screen and admin navigation.
- A live `/admin` overview using Supabase counts and data-quality checks.
- A live `/admin/researchers` directory with name search, status filtering,
  and create/edit/permanent-delete operations.
- Purposeful empty states for Projects, Publications, Events, Grants,
  Announcements, and Research Areas.

Researcher writes use validated Server Actions. Each action verifies the
Supabase user and their `admin`/`super_admin` role before insert, update, or
delete; database RLS remains the final authorization boundary. Other admin
sections do not have write operations yet.

Researcher create and edit forms preserve all typed values when a save fails,
show specific safe error messages, accept any valid HTTP(S) profile link in the
Google Scholar field for now, and lazily preview valid photo URLs.

Admin data is fetched in Server Components and rendered per request. Overview
queries run in parallel; researcher results use 25-row server pagination. Both
data-heavy sections stream through Suspense with layout-matched skeletons.
Client Components are limited to interactions that require browser state.
Authenticated routes are not statically generated because their output depends
on the current session and role.

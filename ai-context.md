# AI context

This is the Islington College Research & Development Digital Hub.

## Current milestone

- Public UI uses dummy data.
- Supabase core schema and RLS migration are already deployed.
- The visual direction is editorial, minimal and Garamond-led.
- Do not use gradients or generic rounded-card layouts.
- Header is sticky and has no utility bar.
- Generated documentary photographs live in `public/images`.
- Layout elements (Header, Footer) are separated into `src/components/layout/`.
- Use TailwindCSS for styling and shadcn (or similar UI libraries) where complex interactive UI is required.

## Routes

- `/` discovery homepage
- `/aboutsection` vision, mission, leadership and partners
- `/search` grouped dummy search results
- `/research-areas` and `/research-areas/[slug]`
- `/people` and `/people/[id]`
- `/projects` and `/projects/[slug]`
- `/publications` and `/publications/[id]`
- `/admin` and `/admin/login`

Next milestone: replace dummy arrays with Supabase reads and wire admin authentication/CRUD.

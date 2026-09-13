# Islington Research — R&D Digital Hub

A connected research and development platform for Islington College. The hub brings researchers, projects, publications, research areas, events, partners, and opportunities into one searchable ecosystem, while giving administrators a single place to manage research content and its relationships.

## Key Features

### Global experience

- Responsive site-wide header, navigation, search access, and footer
- Consistent visual theme across public and administrative pages
- Cross-linked content that makes the research ecosystem easy to explore

### Home and About R&D

- Discovery-focused landing page with hero content and ecosystem search
- Live statistics for researchers, active projects, publications, and research areas
- Featured research and quick-access category cards
- R&D vision, mission, methodology, leadership team, partners, and impact metrics

### Ecosystem discovery search

- One universal search across the platform
- Categorized results for research areas, researchers, projects, publications, and events
- Result cards with direct links to the relevant profiles and detail pages

### Research areas

- Research-area directory and dedicated detail pages
- Descriptions, faculty leads, associated projects, and related publications
- Links between research areas, researchers, projects, and publications

### Researchers

- Searchable researcher directory
- Department and research-area filters
- Detailed profiles with position, department, biography, research interests, ORCID, Google Scholar, research groups, projects, and publications

### Projects

- Searchable project directory with status and research-area filters
- Support for proposed, ongoing, completed, and archived projects
- Detail pages covering objectives, lead researchers, team members, publications, industry partners, timelines, and related events or projects

### Publications and outputs

- Searchable publication library
- Filters for publication type, year, author, and research area
- Journal, conference, and report records with abstracts, DOI, venue, authors, and related projects

### Additional research services

- Events and event detail pages
- Grants and collaboration opportunities
- Research partners and partner profiles
- Ethics guidance and research-support resources
- Downloadable research-support material

### Administration

- Supabase authentication with admin-only routes and role-based permissions
- Dashboard highlighting incomplete profiles, unlinked projects, missing metadata, and platform statistics
- Create, read, update, and delete workflows for researchers, projects, publications, research areas, partners, events, grants, opportunities, announcements, ethics policies, and research-support resources
- Searchable relationship management for connecting researchers, projects, publications, research areas, partners, and events
- Staff management for privileged administrators

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- [React](https://react.dev/) 19 and TypeScript
- [Supabase](https://supabase.com/) for PostgreSQL, authentication, row-level security, and server functions
- [Tailwind CSS](https://tailwindcss.com/) 4
- Base UI, shadcn, Lucide React, Framer Motion, Recharts, React Hook Form, and Zod

## AI Tools Used

This hackathon project was created with support from:

- Antigravity
- Codex
- ChatGPT
- Claude
- Gemini
- MiniMax
- Kimi
- Qwen

These tools assisted across ideation, research, product planning, UI/UX exploration, implementation, debugging, and documentation.

## Project Setup

### Prerequisites

- Node.js and npm
- A Supabase project
- Supabase CLI, if you want to apply the included migrations from the command line

### 1. Clone the repository

```bash
git clone <repository-url>
cd Caffeinated-Chaos
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Required for server-side administrative operations such as staff creation.
# Keep this value private and never expose it in client-side code.
SUPABASE_SECRET_KEY=your_supabase_secret_key
```

`SUPABASE_SERVICE_ROLE_KEY` can be used instead of `SUPABASE_SECRET_KEY` for projects that still use the legacy service-role key name.

### 4. Set up the database

The database schema and row-level security policies are stored in `supabase/migrations`. Link the local project to Supabase and apply the migrations:

```bash
npx supabase login
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

To enable admin access, create a user in Supabase Authentication and add a matching record to the `public.admin` table using that user's ID as `auth_user_id`. Set the role to `admin` or `super_admin`.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The administration login is available at [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## Available Scripts

```bash
npm run dev     # Start the development server
npm run build   # Create a production build
npm run start   # Run the production build
npm run lint    # Run ESLint
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Home and discovery hub |
| `/search` | Universal ecosystem search |
| `/aboutsection` | R&D vision, mission, leadership, and partners |
| `/research-areas` | Research-area directory |
| `/people` | Researcher directory |
| `/projects` | Project directory |
| `/publications` | Publication library |
| `/events` | Research events |
| `/grants` | Grant listings |
| `/opportunities` | Research and collaboration opportunities |
| `/partners` | Research partners |
| `/ethics` | Research ethics information |
| `/research-support` | Research-support resources |
| `/admin` | Protected administration dashboard |

## Production

Create and run an optimized production build with:

```bash
npm run build
npm run start
```

Before deployment, add the same Supabase environment variables to your hosting provider and keep all secret or service-role credentials server-side.

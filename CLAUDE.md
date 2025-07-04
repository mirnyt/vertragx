# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**
```bash
bun dev              # Start all apps in parallel in development mode (web, app, api, email)
bun dev:web          # Marketing site only (port 3001) in development mode
bun dev:app          # Main app only (port 3000) in development mode
bun dev:jobs         # Background jobs only in development mode
bun dev:api          # API only in development mode
bun dev:email        # Email app only in development mode
```
**Database:**
```bash
bun migrate          # Run Supabase migrations
bun seed             # Populate database with seed data
```

**Code Quality:**
```bash
bun lint             # Biome linting + sherif monorepo checks
bun lint:repo:fix    # Fix monorepo dependency issues
bun format           # Biome formatting (2-space indentation)
bun typecheck        # TypeScript checking across workspace
```

**Build & Deploy:**
```bash
bun build            # Production build
bun start:web        # Start web app in production
bun start:app        # Start main app in production
```

## Architecture

This is a **Turborepo monorepo** with Bun package manager for a production SaaS starter kit based on Midday.

**Workspace Structure:**
- `apps/web/` - Next.js marketing site (port 3001)
- `apps/app/` - Main SaaS application (port 3000) 
- `apps/api/` - Supabase backend (database, auth, edge functions)
- `packages/` - Shared packages (ui, supabase, analytics, email, jobs, kv, logger, voltagent)

├── apps                         # App workspace
│    ├── api                     # Supabase (API, Auth, Storage, Realtime, Edge Functions)
│    ├── app                     # App - your product
│    ├── web                     # Marketing site
│    └── ...
├── packages                     # Shared packages between apps
│    ├── analytics               # OpenPanel analytics
│    ├── email                   # React email library
│    ├── jobs                    # Trigger.dev background jobs
│    ├── kv                      # Upstash rate-limited key-value storage
│    ├── logger                  # Logger library
│    ├── supabase                # Supabase - Queries, Mutations, Clients
│    └── ui                      # Shared UI components (Shadcn)
│    └── voltagent               # AI Agent Framework (VoltAgent.dev)
├── tooling                      # are the shared configuration that are used by the apps and packages
│    └── typescript              # Shared TypeScript configuration
├── .cursorrules                 # Cursor rules specific to this project
├── biome.json                   # Biome configuration
├── turbo.json                   # Turbo configuration
├── LICENSE
└── README.md

**Packages**
Next.js - Framework
Turborepo - Build system
Biome - Linter, formatter
TailwindCSS - Styling
Shadcn - UI components
TypeScript - Type safety
Supabase - Authentication, database, storage
Upstash - Cache and rate limiting
React Email - Email templates
Resend - Email delivery
i18n - Internationalization
Sentry - Error handling/monitoring
Dub - Sharable links
Trigger.dev - Background jobs
OpenPanel - Analytics
Polar - Billing (coming soon)
react-safe-action - Validated Server Actions
nuqs - Type-safe search params state manager
next-themes - Theme manager
VoltAgent - AI agent framework (voltagent.dev)

**Tech Stack:**
- **Frontend:** Next.js 14 App Router, TailwindCSS, Shadcn UI, TypeScript
- **Backend:** Supabase (PostgreSQL + Auth + Storage + Edge Functions)
- **State:** next-safe-action for server actions, nuqs for URL state
- **Services:** Upstash Redis, Resend email, Sentry monitoring, Trigger.dev jobs
- **AI:** VoltAgent framework for AI agents and tools
- **Tooling:** Biome (linting/formatting), Turborepo, TypeScript

**Key Patterns:**
- Server Actions with validation using `next-safe-action` and Zod schemas
- Rate limiting with Upstash Redis on actions
- Row Level Security (RLS) policies in Supabase
- VoltAgent AI agents with tools using Zod schema validation
- Shared TypeScript configs in `tooling/typescript/`
- Workspace packages for code reuse across apps

**Environment Setup:**
Each app has separate `.env` files. Copy from `.env.example` and configure:
- Supabase (database, auth)
- Upstash Redis (caching, rate limiting) 
- Resend (email delivery)
- Sentry (error monitoring)
- OpenPanel (analytics)
- Dub (link shortening)
- VoltAgent (AI agent framework)

**Development Notes:**
- Use functional components with TypeScript interfaces
- Prefer Server Components over client components
- Follow naming: lowercase-with-dashes for directories
- Error handling: early returns, guard clauses, proper logging
- Use Zod for validation, model errors as return values
- VoltAgent tools use Zod schemas for parameter validation (compatible with Zod 3.24.2+)
- Mobile-first responsive design with Tailwind
- ALWAYS refer to VoltAgent Documentation at https://voltagent.dev/docs/ before building any Agents and only use this framework. 
- ALWAYS build VoltAgent AI Agents with Vercel AI provider. Documentation at https://voltagent.dev/docs/providers/vercel-ai/
- Any suitable VoltAgent patterns can be used when building agents (agents, tools, workflows, etc.) - no restrictions on VoltAgent features
- ALWAYS use shadcn library https://ui.shadcn.com/docs/ for ALL UI components and layout - this is MANDATORY
- ALWAYS make sure that the user interface is responsive for desktop, tablet and mobile form factors
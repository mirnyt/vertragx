# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

# VertragX

About VertragX platform -> provides digital sourcing enablement technology, streamlining supplier and partner sourcing processes for industrial organizations seeking to modernize their procurement workflows. VertragX, an AI-powered industrial engineering marketplace built on the promise of "Match. Quote. Win." The design must embody precision and clarity, reflecting how VertragX connects the right engineering requirements with the right manufacturing expertise, every time. Use generous whitespace, MINIMAL subtle gradients, and refined typography to create a premium, professional aesthetic. The page must clearly illustrate where VertragX optimizes the critical sourcing phase of the Source-to-Pay (S2P) process, demonstrating tangible value for both industrial buyers seeking capable suppliers and suppliers seeking winnable opportunities. Every design element should reinforce the platform's core value: intelligent matching that eliminates wasted time and mismatched RFQs.

VertragX is an AI-powered industrial sourcing platform that helps match buyers with qualified suppliers.

## Commands

**IMPORTANT:** This project uses Bun (https://bun.sh/). Bun is an all-in-one JavaScript runtime & toolkit designed for speed, complete with a bundler, test runner, and Node.js-compatible package manager. **DO NOT USE npm commands**.

**Development:**
```bash
bun dev              # Start all apps in parallel (web, app, api, email)
bun dev:web          # Marketing site only (port 3001)
bun dev:app          # Main app only (port 3000)
bun dev:jobs         # Background jobs only (Trigger.dev)
bun dev:email        # Email development server (port 3003)
```

**Database Management:**
```bash
bun migrate          # Run Supabase migrations
bun seed             # Populate database with seed data
bun reset            # Reset Supabase database (apps/api)
bun generate         # Generate TypeScript types from Supabase schema
bun login            # Supabase login (apps/api)
```

**Testing:**
```bash
bun test             # Run tests in parallel across workspace
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
bun build            # Production build for all apps
bun start:web        # Start web app in production
bun start:app        # Start main app in production
```

**Maintenance:**
```bash
bun clean            # Clean git repository (remove node_modules)
bun clean:workspaces # Clean all workspace build artifacts
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

**Required for all apps:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_KEY` - Supabase service role key (server-side only)

**Additional services:**
- **Upstash Redis**: `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`
- **Resend Email**: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`
- **Sentry**: `NEXT_PUBLIC_SENTRY_DSN`, `SENTRY_AUTH_TOKEN`
- **OpenPanel**: `OPENPANEL_CLIENT_ID`, `OPENPANEL_CLIENT_SECRET`
- **Dub**: `DUB_API_KEY`
- **VoltAgent**: AI agent configuration
- **Trigger.dev**: `TRIGGER_SECRET_KEY`

**Optional services (not currently used):**
- **Google OAuth**: `GOOGLE_CLIENT_ID`, `GOOGLE_SECRET` (disabled in config)

**Development Notes:**
- Use functional components with TypeScript interfaces
- Prefer Server Components over client components
- Follow naming: lowercase-with-dashes for directories
- Error handling: early returns, guard clauses, proper logging
- Use Zod for validation, model errors as return values
- VoltAgent tools use Zod schemas for parameter validation (compatible with Zod 3.24.2+)
- Mobile-first responsive design with Tailwind
- ALWAYS refer to VoltAgent Documentation at https://voltagent.dev/docs/ before building any Agents and only use this framework
- ALWAYS build VoltAgent AI Agents with Vercel AI provider. Documentation at https://voltagent.dev/docs/providers/vercel-ai/
- Any suitable VoltAgent patterns can be used when building agents (agents, tools, workflows, etc.) - no restrictions on VoltAgent features
- ALWAYS use shadcn library https://ui.shadcn.com/docs/ for ALL UI components and layout - this is MANDATORY
- ALWAYS make sure that the user interface is responsive for desktop, tablet and mobile form factors
- NEVER commit changes unless explicitly asked by the user
- Code comments are discouraged unless specifically requested

**Theme for shadcn, tailwind, user interface**
### Theme
```css
   :root {
   --background: #fcfcfc;
   --foreground: #000000;
   --card: #ffffff;
   --card-foreground: #000000;
   --popover: #fcfcfc;
   --popover-foreground: #000000;
   --primary: #1b365d;
   --primary-foreground: #ffffff;
   --secondary: #ebebeb;
   --secondary-foreground: #000000;
   --muted: #f5f5f5;
   --muted-foreground: #525252;
   --accent: #ebebeb;
   --accent-foreground: #ff6b35;
   --destructive: #e54b4f;
   --destructive-foreground: #ffffff;
   --border: #e4e4e4;
   --input: #ebebeb;
   --ring: #000000;
   --sidebar: #fcfcfc;
   --sidebar-foreground: #000000;
   --sidebar-primary: #000000;
   --sidebar-primary-foreground: #ffffff;
   --sidebar-accent: #ebebeb;
   --sidebar-accent-foreground: #000000;
   --sidebar-border: #ebebeb;
   --sidebar-ring: #000000;
   }

   .dark {
   --background: #000000;
   --foreground: #ffffff;
   --card: #090909;
   --card-foreground: #ffffff;
   --popover: #121212;
   --popover-foreground: #ffffff;
   --primary: #ffffff;
   --primary-foreground: #000000;
   --secondary: #222222;
   --secondary-foreground: #ffffff;
   --muted: #1d1d1d;
   --muted-foreground: #a4a4a4;
   --accent: #333333;
   --accent-foreground: #ffffff;
   --destructive: #ff5b5b;
   --destructive-foreground: #000000;
   --border: #242424;
   --input: #333333;
   --ring: #a4a4a4
   --sidebar-foreground: #ffffff;
   --sidebar-primary: #ffffff;
   --sidebar-primary-foreground: #000000;
   --sidebar-accent: #333333;
   --sidebar-accent-foreground: #ffffff;
   --sidebar-border: #333333;
   --sidebar-ring: #a4a4a4;
   }

   @theme inline {
   --color-background: var(--background);
   --color-foreground: var(--foreground);
   --color-card: var(--card);
   --color-card-foreground: var(--card-foreground);
   --color-popover: var(--popover);
   --color-popover-foreground: var(--popover-foreground);
   --color-primary: var(--primary);
   --color-primary-foreground: var(--primary-foreground);
   --color-secondary: var(--secondary);
   --color-secondary-foreground: var(--secondary-foreground);
   --color-muted: var(--muted);
   --color-muted-foreground: var(--muted-foreground);
   --color-accent: var(--accent);
   --color-accent-foreground: var(--accent-foreground);
   --color-destructive: var(--destructive);
   --color-destructive-foreground: var(--destructive-foreground);
   --color-border: var(--border);
   --color-input: var(--input);
   --color-ring: var(--ring);
   --color-chart-1: var(--chart-1);
   --color-chart-2: var(--chart-2);
   --color-chart-3: var(--chart-3);
   --color-chart-4: var(--chart-4);
   --color-chart-5: var(--chart-5);
   --color-sidebar: var(--sidebar);
   --color-sidebar-foreground: var(--sidebar-foreground);
   --color-sidebar-primary: var(--sidebar-primary);
   --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
   --color-sidebar-accent: var(--sidebar-accent);
   --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
   --color-sidebar-border: var(--sidebar-border);
   --color-sidebar-ring: var(--sidebar-ring);

   --font-sans: var(--font-sans);
   --font-mono: var(--font-mono);
   --font-serif: var(--font-serif);

   --radius-sm: calc(var(--radius) - 4px);
   --radius-md: calc(var(--radius) - 2px);
   --radius-lg: var(--radius);
   --radius-xl: calc(var(--radius) + 4px);

   --shadow-2xs: var(--shadow-2xs);
   --shadow-xs: var(--shadow-xs);
   --shadow-sm: var(--shadow-sm);
   --shadow: var(--shadow);
   --shadow-md: var(--shadow-md);
   --shadow-lg: var(--shadow-lg);
   --shadow-xl: var(--shadow-xl);
   --shadow-2xl: var(--shadow-2xl);
   }
```

## Database Schema

The project uses Supabase (PostgreSQL) with the following core tables:

**Users Table:**
- Integrated with Supabase Auth
- Stores user profiles and metadata
- Protected by Row Level Security (RLS)

**Posts Table:**
- User-generated content
- Linked to users via foreign key
- Automatic timestamp management

**Key Database Patterns:**
- All tables use UUID primary keys
- RLS policies enforce data access control
- Automatic created_at/updated_at timestamps
- Foreign key constraints maintain referential integrity

## Common Workflows

### Starting Fresh Development
1. Clone the repository
2. Install dependencies: `bun install`
3. Copy `.env.example` to `.env` in each app directory
4. Configure environment variables
5. Start Supabase: `cd apps/api && bun dev`
6. Run migrations: `bun migrate`
7. Seed database: `bun seed`
8. Start development: `bun dev`

### Adding New Features
1. Create feature branch from main
2. Use Server Components by default
3. Add Server Actions for mutations
4. Use Shadcn components for UI
5. Add proper TypeScript types
6. Test across all breakpoints
7. Run `bun lint` and `bun typecheck` before committing

### Working with AI Agents
1. Always check VoltAgent docs first
2. Use Vercel AI provider
3. Define tools with Zod schemas
4. Handle errors gracefully
5. Test agent responses thoroughly

## Adding New Packages to the Monorepo

This section provides comprehensive instructions for introducing new packages to the monorepo. Follow these steps when adding any npm package or GitHub repository.

### Step 1: Determine Package Type

**CRITICAL:** First determine if this should be:
- **Shared Package** (in `packages/`): For code used across multiple apps
- **App Dependency**: For packages used by a single app only

**Decision Criteria:**
- If the package provides shared functionality (utilities, components, integrations) → Create as shared package
- If the package is only used by one app (e.g., a specific UI library for web only) → Add as app dependency

### Step 2A: Adding as App Dependency (Single App Use)

If the package is only for one app:

```bash
# Navigate to the specific app
cd apps/[app-name]  # e.g., apps/app, apps/web, apps/api

# Add the dependency using bun
bun add [package-name]  # for production dependencies
bun add -D [package-name]  # for dev dependencies
```

### Step 2B: Creating a Shared Package (Multi-App Use)

For shared packages, create a new package in the `packages/` directory:

#### 2B.1: Create Package Structure

```bash
# Create the package directory
mkdir -p packages/[package-name]/src

# Navigate to the package
cd packages/[package-name]
```

#### 2B.2: Create package.json

Create `packages/[package-name]/package.json`:

```json
{
  "name": "@v1/[package-name]",
  "version": "0.1.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "clean": "rm -rf .turbo node_modules",
    "lint": "biome check .",
    "format": "biome format --write .",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    // Add the npm package here
    "[npm-package-name]": "^x.x.x"
  },
  "devDependencies": {
    "@v1/typescript-config": "workspace:*",
    "typescript": "catalog:default"
  },
  "exports": {
    ".": {
      "types": "./src/index.ts",
      "default": "./src/index.ts"
    },
    // Add additional exports as needed
    "./client": "./src/client.ts",
    "./server": "./src/server.ts"
  }
}
```

**IMPORTANT Naming Conventions:**
- Package name in filesystem: `lowercase-with-dashes`
- Package name in package.json: `@v1/lowercase-with-dashes`
- TypeScript imports: `@v1/lowercase-with-dashes`

#### 2B.3: Create TypeScript Configuration

Create `packages/[package-name]/tsconfig.json`:

```json
{
  "extends": "@v1/typescript-config/base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### 2B.4: Create Index File

Create `packages/[package-name]/src/index.ts`:

```typescript
// Server-only package (add this if the package should only run server-side)
import "server-only";

// Export the main functionality
export * from "./[main-module]";

// Re-export from the npm package if needed
export { SomeClass, someFunction } from "[npm-package-name]";
```

### Step 3: Determine Client/Server Usage

**CRITICAL Decision:** Determine where this package will run:

1. **Server-only** (most integrations, API clients, database):
   - Add `import "server-only";` at the top of index.ts
   - Use in Server Components and Server Actions only

2. **Client-only** (UI libraries, browser APIs):
   - Add `"use client";` directive where needed
   - Can be used in Client Components

3. **Universal** (utilities, shared types):
   - No special directives needed
   - Create separate exports for client/server if needed

### Step 4: Add to Workspace Dependencies

Add the shared package to apps that need it:

```bash
# Navigate to the app
cd apps/[app-name]

# Add the workspace dependency
bun add @v1/[package-name]@workspace:*
```

### Step 5: Handle Package-Specific Configuration

#### 5.1: Environment Variables

If the package needs environment variables:

1. Add to `.env.example` in relevant apps:
```bash
# For client-side variables (accessible in browser)
NEXT_PUBLIC_[PACKAGE_NAME]_API_KEY=your_api_key_here

# For server-side variables (secure)
[PACKAGE_NAME]_SECRET_KEY=your_secret_key_here
```

2. Update CLAUDE.md environment section
3. Add TypeScript types in the package:

```typescript
// packages/[package-name]/src/env.ts
export const env = {
  apiKey: process.env.NEXT_PUBLIC_[PACKAGE_NAME]_API_KEY!,
  secretKey: process.env.[PACKAGE_NAME]_SECRET_KEY!,
};
```

#### 5.2: Package Initialization

Create initialization patterns based on package type:

**For API Clients:**
```typescript
// packages/[package-name]/src/client.ts
import { SomeSDK } from "[npm-package-name]";

let client: SomeSDK | null = null;

export function getClient() {
  if (!client) {
    client = new SomeSDK({
      apiKey: process.env.[PACKAGE_NAME]_API_KEY!,
    });
  }
  return client;
}
```

**For React Components/Hooks:**
```typescript
// packages/[package-name]/src/provider.tsx
"use client";

import { SomeProvider } from "[npm-package-name]";

export function PackageProvider({ children }: { children: React.ReactNode }) {
  return (
    <SomeProvider config={...}>
      {children}
    </SomeProvider>
  );
}
```

### Step 6: Integration Patterns

Based on package type, implement appropriate patterns:

#### 6.1: Service Integration (API, Database, etc.)

1. Create query/mutation files:
```typescript
// packages/[package-name]/src/queries.ts
import { getClient } from "./client";

export async function getData(id: string) {
  const client = getClient();
  return client.fetch(id);
}
```

2. Create Server Actions if needed:
```typescript
// apps/app/src/actions/[package-name]/action.ts
import { authActionClient } from "@/actions/safe-action";
import { getData } from "@v1/[package-name]";

export const fetchDataAction = authActionClient
  .schema(z.object({ id: z.string() }))
  .action(async ({ parsedInput, ctx }) => {
    return getData(parsedInput.id);
  });
```

#### 6.2: UI Component Library

1. Re-export components:
```typescript
// packages/[package-name]/src/components.ts
"use client";

export { Button, Card, Modal } from "[npm-package-name]";
export * from "[npm-package-name]/styles.css";
```

2. Add to app layout if needed:
```tsx
// apps/app/src/app/layout.tsx
import { PackageProvider } from "@v1/[package-name]/provider";

export default function Layout({ children }) {
  return (
    <PackageProvider>
      {children}
    </PackageProvider>
  );
}
```

### Step 7: Testing and Validation

After adding the package:

```bash
# Install dependencies
bun install

# Run TypeScript check
bun typecheck

# Run linting
bun lint

# Test in development
bun dev
```

### Step 8: Update Documentation

1. Add package to the Architecture section in CLAUDE.md
2. Document any required environment variables
3. Add usage examples if complex
4. Update the "Packages" list in CLAUDE.md

### Common Package Examples

**Analytics Package Pattern:**
- Server and client exports
- Provider for client-side
- Environment variables for API keys

**AI/LLM Package Pattern:**
- Server-only with "server-only" import
- Client initialization
- Zod schemas for validation

**UI Component Package Pattern:**
- Client-side with "use client"
- Re-export components
- Include styles/themes

**Utility Package Pattern:**
- Pure functions
- No environment dependencies
- Universal usage

### Troubleshooting

**Import errors:**
- Ensure package.json exports are correct
- Check TypeScript paths in tsconfig
- Verify workspace dependency is added

**Runtime errors:**
- Check if package needs client/server directive
- Verify environment variables are set
- Ensure initialization is done before usage

**Build errors:**
- Run `bun clean` and `bun install`
- Check for circular dependencies
- Verify package.json main/types paths

## Authentication Implementation

The project uses **Supabase Auth** with SSR (Server-Side Rendering) for secure authentication.

### Authentication Architecture

**Three Supabase Clients:**
1. **Browser Client** (`@v1/supabase/client`) - Client-side operations
2. **Server Client** (`@v1/supabase/server`) - Server Components & Actions
3. **Middleware Client** - Session management in middleware

### Session Management
- Sessions stored in secure HTTP-only cookies
- Automatic session refresh via middleware
- No React Context needed - server-first approach
- JWT expiry: 10 hours (36000 seconds)

### Protected Routes
Middleware (`apps/app/src/middleware.ts`) handles protection:
```typescript
// Redirects unauthenticated users to /login
if (!request.nextUrl.pathname.endsWith("/login") && !user) {
  return NextResponse.redirect(new URL("/login", request.url));
}
```

### Available Auth Methods
**Currently Implemented:**
- ✅ Email/password authentication (signup & signin)
- ✅ Email verification for new accounts
- ✅ Password reset flow via email
- ✅ Session-based authentication
- ✅ Secure cookie management

**Not Implemented:**
- ❌ Magic link authentication
- ❌ OAuth providers (Google OAuth disabled but code preserved)

### Authentication Flows

**1. Sign Up with Email/Password:**
```typescript
// Server action handles registration
await signUpAction({
  email: "user@example.com",
  password: "securepassword",
  fullName: "John Doe"
});
// User receives verification email
```

**2. Sign In with Email/Password:**
```typescript
// Server action handles login
await signInAction({
  email: "user@example.com",
  password: "securepassword"
});
// Redirects to dashboard on success
```

**3. Sign Out:**
```typescript
// Client-side logout
const supabase = createClient();
await supabase.auth.signOut();
// Redirects to /login
```

**4. Password Reset Flow:**
```typescript
// Request password reset
await forgotPasswordAction({
  email: "user@example.com"
});
// User receives reset email with link to /reset-password

// Set new password
await resetPasswordAction({
  password: "newpassword",
  confirmPassword: "newpassword"
});
```

**5. Auth Callback Handler:**
- Route: `/api/auth/callback`
- Handles email verification confirmations
- Sets session cookies
- Redirects to dashboard

### Accessing User Data

**In Server Components:**
```typescript
import { getUser } from "@v1/supabase/queries";

const user = await getUser();
if (!user) {
  redirect("/login");
}
```

**In Server Actions:**
```typescript
// Using authActionClient (includes user in context)
export const myAction = authActionClient
  .schema(schema)
  .action(async ({ parsedInput, ctx }) => {
    const { user } = ctx; // Authenticated user
    // Action logic
  });
```

**In Client Components:**
```typescript
import { createClient } from "@v1/supabase/client";

const supabase = createClient();
const { data: { user } } = await supabase.auth.getUser();
```

### Auth Configuration Files
- **Environment Variables:** See Environment Setup section
- **Supabase Config:** `apps/api/supabase/config.toml`
- **Email Auth:** Enabled with verification and signup
- **OAuth Setup:** Google provider disabled (can be re-enabled if needed)
- **Database:** Users table with RLS policies

### Security Features
- Row Level Security (RLS) on all tables
- Rate limiting on auth actions (via Upstash)
- Secure cookie-based sessions
- Service role key never exposed client-side
- Automatic user tracking in analytics

## Analytics Integration (OpenPanel)

The project uses OpenPanel for analytics tracking via the `@v1/analytics` package.

### Setup Requirements

**Environment Variables:**
```bash
# Client-side (public)
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_xxxxxxxxxx

# Server-side (secret)
OPENPANEL_SECRET_KEY=op_secret_yyyyyyyy
```

### Current Implementation Status

**✅ Working:**
- Analytics package configured at `packages/analytics`
- Server-side tracking infrastructure ready
- Web app has client-side provider (marketing site)
- Server actions support analytics metadata
- Auto user identification for authenticated users
- Dev/prod environment handling (logs in dev, sends in prod)

**❌ Missing:**
- Analytics Provider not added to main app (`apps/app`) layout
- No server actions actually using track metadata yet
- Events definition file doesn't exist

### Usage Patterns

**1. Client-Side Event Tracking:**
```typescript
import { track } from '@v1/analytics/client';

// Track custom events (only works where Provider is added)
track({
  event: 'button_clicked',
  button_name: 'submit',
  page: '/dashboard'
});
```

**2. Server Action with Analytics:**
```typescript
export const myAction = authActionClient
  .schema(mySchema)
  .metadata({
    name: "action-name",
    track: {  // Optional analytics tracking
      event: "user_action_performed", 
      channel: "api"
    }
  })
  .action(async ({ parsedInput, ctx }) => {
    // Action logic here
  });
```

**3. Manual Server-Side Tracking:**
```typescript
import { setupAnalytics } from '@v1/analytics/server';

const analytics = await setupAnalytics({
  userId: user.id,
  fullName: user.full_name
});

analytics.track({
  event: 'custom_server_event',
  properties: { key: 'value' }
});
```

### Implementation Checklist

To fully implement analytics:

1. **Add Provider to Main App:**
   ```tsx
   // In apps/app/layout.tsx
   import { AnalyticsProvider } from '@v1/analytics/client';
   
   <AnalyticsProvider>
     {children}
   </AnalyticsProvider>
   ```

2. **Track Key Events:**
   - User registration/login
   - Feature usage
   - Errors and exceptions
   - Conversion events

3. **Create Events Schema:**
   - Add `packages/analytics/src/events.ts`
   - Define standard event names and properties

### Analytics Best Practices

- Only track in production (handled automatically)
- Use consistent event naming conventions
- Include relevant context in event properties
- Don't track sensitive user data
- Use server-side tracking for critical events
- Client-side tracking for UI interactions

## Project Best Practices

1. **Component Architecture:**
   - Server Components for data fetching
   - Client Components only when needed (interactivity)
   - Colocate components with their routes

2. **Data Fetching:**
   - Use Server Actions for mutations
   - Implement proper loading states
   - Handle errors with try-catch blocks

3. **Styling:**
   - Mobile-first approach
   - Use Tailwind utility classes
   - Follow the defined theme system
   - Maintain consistent spacing

4. **Security:**
   - Never expose sensitive keys client-side
   - Use RLS policies for data access
   - Validate all user inputs with Zod
   - Rate limit sensitive operations

5. **Performance:**
   - Optimize images with Next.js Image
   - Use dynamic imports for heavy components
   - Implement proper caching strategies
   - Monitor with Sentry

6. **Analytics:**
   - Track important user actions
   - Use metadata in server actions
   - Respect user privacy
   - Test tracking in development (check console logs)
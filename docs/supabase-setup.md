# Supabase Setup Instructions

This document provides step-by-step instructions for setting up Supabase for the V1 project.

## Prerequisites

- A Supabase account
- Google Cloud Console project (for OAuth)
- Access to the V1 project codebase

## 1. Create Supabase Account & Project

1. Go to [supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: Choose a name for your project
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Select closest to your users
5. Click "Create new project"
6. Wait for project initialization (2-3 minutes)

## 2. Get Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - Keep this secret!

## 3. Configure Environment Variables

Update your `.env` file in `apps/app/` with:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... # anon public key
SUPABASE_SERVICE_KEY=eyJ... # service_role key (secret!)
```

## 4. Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Configure **Google OAuth**:
   - Enable Google provider
   - Add your Google OAuth credentials:
     - **Client ID** and **Client Secret** from Google Cloud Console
   - Add redirect URLs:
     - `http://localhost:3000/api/auth/callback` (development)
     - `https://yourdomain.com/api/auth/callback` (production)

## 5. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Run the migration files in order:
   ```sql
   -- Run the contents of apps/api/supabase/migrations/ files:
   -- 1. 20240901155537_create_auth_users_triggers.sql
   -- 2. 20240901155538_create_users_table.sql  
   -- 3. 20240901165124_create_posts_table.sql
   ```

## 6. Configure Row Level Security (RLS)

The migration files should set up RLS policies, but verify in **Authentication** → **Policies** that:
- `users` table has policies for user data access
- `posts` table has policies for user's own posts
- Policies are enabled on all tables

## 7. Set Up Local Development (Optional)

For local Supabase development:

1. Install Supabase CLI: `npm install -g supabase`
2. Initialize: `supabase init`
3. Start local instance: `supabase start`
4. This will give you local URLs and keys for development

## 8. Configure Edge Functions (Optional)

If using the email edge function:

1. In Supabase dashboard, go to **Edge Functions**
2. Deploy the function from `apps/api/supabase/functions/send-email/`
3. Set environment variables for the function in the dashboard

## 9. Verify Setup

1. Start your development server: `bun dev:app`
2. Try to sign in with Google OAuth
3. Check that user data appears in the `users` table
4. Test the calculator functionality to ensure everything works

## Environment Variables Reference

Here are all the Supabase-related environment variables you need:

### apps/app/.env:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...
```

### apps/api/.env:
```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

## Important Notes

- Keep your `service_role` key secret - never expose it in client-side code
- The `anon` key is safe to use in frontend applications
- RLS policies are crucial for data security - ensure they're properly configured
- Test authentication flow thoroughly before going to production

## Troubleshooting

### Common Issues

1. **Authentication not working**: Check that redirect URLs are correctly configured
2. **Database connection errors**: Verify environment variables are correct
3. **RLS policy errors**: Ensure policies are enabled and properly configured
4. **Migration errors**: Run migrations in the correct order

### Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

This setup will give you a fully functional Supabase backend with authentication, database, and all the features this V1 project requires.
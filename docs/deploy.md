# Vercel Deployment Guide

Step-by-step instructions to deploy your VertragX project to Vercel.

## 1. Create Vercel Account
- Go to https://vercel.com
- Click "Sign Up"
- Choose "Continue with GitHub" to connect your GitHub account
- Authorize Vercel to access your repositories

## 2. Import Your Project
- On Vercel dashboard, click "Add New..." → "Project"
- Find your `vertragx` repository and click "Import"
- Vercel will detect it's a Next.js project

## 3. Configure Build Settings
Since this is a monorepo with Turborepo:
- **Framework Preset**: Next.js
- **Root Directory**: `apps/app` (for main app) or `apps/web` (for marketing site)
- **Build Command**: `cd ../.. && bun run build --filter=app`
- **Install Command**: `bun install`
- **Output Directory**: Leave default (`.next`)

## 4. Environment Variables
Add these in Vercel project settings:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=your_openpanel_id
OPENPANEL_SECRET_KEY=your_openpanel_secret
```

## 5. Deploy
- Click "Deploy"
- Vercel will build and deploy your app
- You'll get a `.vercel.app` URL

## 6. Set Up Additional Apps (Optional)
For the marketing site (`apps/web`):
- Create another Vercel project
- Set Root Directory to `apps/web`
- Build Command: `cd ../.. && bun run build --filter=web`

## 7. Custom Domain (Optional)
- Go to project settings → Domains
- Add your custom domain
- Configure DNS records as instructed

Your main app will be at the generated Vercel URL, ready for production use.
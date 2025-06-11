# Trigger.dev Setup Instructions

This document provides step-by-step instructions for setting up Trigger.dev for background jobs in the V1 project.

## Prerequisites

- A Trigger.dev account
- Node.js and Bun installed
- Access to the V1 project codebase
- A deployed or local development environment

## 1. Create Trigger.dev Account

1. Go to [trigger.dev](https://trigger.dev) and sign up for an account
2. Choose your authentication method (GitHub, Google, or email)
3. Complete the onboarding process
4. You'll be redirected to the Trigger.dev dashboard

## 2. Create a New Project

1. In the Trigger.dev dashboard, click "Create Project"
2. Enter project details:
   - **Project Name**: Choose a name (e.g., "V1 Production" or "V1 Development")
   - **Description**: Optional description of your project
3. Click "Create Project"
4. You'll be taken to the project dashboard

## 3. Get API Keys and Environment Variables

1. In your project dashboard, go to the **Environment & API Keys** section
2. Copy the following values for each environment:

### Development Environment:
```bash
TRIGGER_API_KEY=tr_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev
```

### Production Environment:
```bash
TRIGGER_API_KEY=tr_prod_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  
TRIGGER_API_URL=https://api.trigger.dev
```

## 4. Configure Environment Variables

Update your environment files with Trigger.dev credentials:

### packages/jobs/.env:
```bash
# Trigger.dev
TRIGGER_API_KEY=tr_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev
```

### apps/app/.env (if needed):
```bash
# Trigger.dev (optional for client-side triggering)
NEXT_PUBLIC_TRIGGER_PUBLIC_KEY=pk_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 5. Install and Configure Trigger.dev CLI

1. Install the Trigger.dev CLI globally:
   ```bash
   npm install -g @trigger.dev/cli@latest
   ```

2. Login to Trigger.dev:
   ```bash
   npx trigger.dev@latest login
   ```

3. Navigate to your jobs package:
   ```bash
   cd packages/jobs
   ```

4. Initialize Trigger.dev in the jobs package:
   ```bash
   npx trigger.dev@latest init
   ```

5. Follow the prompts:
   - Select your project
   - Choose framework: **"Other"** or **"Node.js"**
   - Set the trigger directory: `./trigger` (default)

## 6. Configure Trigger.dev Client

The project already has Trigger.dev configured in `packages/jobs/trigger.config.ts`. Verify the configuration:

```typescript
import type { TriggerConfig } from "@trigger.dev/sdk/v3";

export const config: TriggerConfig = {
  project: "your-project-id", // This should match your project ID
  // Your other config options
};
```

Update the `project` field with your actual project ID from the dashboard.

## 7. Understanding the Jobs Structure

The V1 project has jobs organized in `packages/jobs/trigger/`:

### Example Job Structure:
```
packages/jobs/
├── trigger.config.ts       # Trigger.dev configuration
├── trigger/
│   ├── example.ts         # Example job (you can customize this)
│   └── [your-jobs].ts     # Add your custom jobs here
└── package.json
```

### Job Development:
1. **Create new jobs** in the `trigger/` directory
2. **Use the example job** as a template
3. **Import and use** other V1 packages (analytics, email, supabase, etc.)

## 8. Deploy Jobs to Trigger.dev

### Development Deployment:
1. Navigate to the jobs package:
   ```bash
   cd packages/jobs
   ```

2. Deploy to development environment:
   ```bash
   npx trigger.dev@latest deploy
   ```

3. Follow the prompts to select environment and confirm deployment

### Production Deployment:
1. Set production environment variables
2. Deploy to production:
   ```bash
   npx trigger.dev@latest deploy --env prod
   ```

## 9. Monitor and Test Jobs

### Dashboard Monitoring:
1. Go to your Trigger.dev project dashboard
2. Navigate to **"Runs"** to see job executions
3. Check **"Jobs"** to see all deployed jobs
4. Use **"Logs"** to debug issues

### Testing Jobs:
1. **Trigger jobs manually** from the dashboard
2. **Use the Test feature** in the Trigger.dev dashboard
3. **Monitor execution** in real-time
4. **Check logs** for debugging

## 10. Integration with V1 Services

### Available V1 Packages in Jobs:
The jobs can import and use all V1 packages:

```typescript
// Email functionality
import { sendEmail } from "@v1/email";

// Analytics tracking  
import { track } from "@v1/analytics/server";

// Database operations
import { createClient } from "@v1/supabase/server";

// Caching and rate limiting
import { client } from "@v1/kv/client";

// Logging
import { logger } from "@v1/logger";
```

### Common Job Patterns:
1. **Email notifications** - Send delayed or scheduled emails
2. **Data processing** - Process uploads, generate reports
3. **Cleanup tasks** - Delete old data, archive records
4. **Integration sync** - Sync with external services
5. **Analytics processing** - Process and aggregate data

## 11. Environment Configuration

### Development vs Production:
- **Development**: Use `tr_dev_` API keys for testing
- **Production**: Use `tr_prod_` API keys for live jobs

### Webhook Configuration (Optional):
If you need to trigger jobs from external sources:

1. In Trigger.dev dashboard, go to **"Webhooks"**
2. Create a new webhook endpoint
3. Configure the webhook URL in your external service
4. Handle webhook events in your jobs

## 12. Job Scheduling and Triggers

### Types of Triggers:
1. **Scheduled Jobs** - Cron-like scheduling
2. **Event-driven** - Triggered by application events
3. **Webhook triggers** - External service integrations
4. **Manual triggers** - Dashboard or API triggered

### Example Scheduling:
```typescript
import { schedules } from "@trigger.dev/sdk/v3";

export const dailyCleanup = schedules.task({
  id: "daily-cleanup",
  cron: "0 2 * * *", // Run at 2 AM daily
  run: async (payload) => {
    // Your cleanup logic here
  },
});
```

## 13. Verify Setup

### Test Job Deployment:
1. Deploy the example job:
   ```bash
   cd packages/jobs
   npx trigger.dev@latest deploy
   ```

2. Check dashboard for successful deployment

### Test Job Execution:
1. Go to Trigger.dev dashboard
2. Navigate to your deployed job
3. Click "Test" to run manually
4. Verify execution in logs

### Integration Test:
1. Create a simple job that uses V1 services
2. Test email sending, database access, etc.
3. Verify all integrations work correctly

## Environment Variables Reference

### Required Variables:
```bash
# Trigger.dev API Configuration
TRIGGER_API_KEY=tr_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TRIGGER_API_URL=https://api.trigger.dev

# Optional: For client-side triggering
NEXT_PUBLIC_TRIGGER_PUBLIC_KEY=pk_dev_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Service integrations (inherit from main app)
SUPABASE_SERVICE_KEY=eyJ...
RESEND_API_KEY=re_...
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...
```

## Troubleshooting

### Common Issues

1. **Deployment Fails**:
   - Check API key is correct
   - Verify project ID in trigger.config.ts
   - Ensure CLI is logged in: `npx trigger.dev@latest login`

2. **Jobs Not Triggering**:
   - Check job is successfully deployed
   - Verify trigger conditions are met
   - Check dashboard logs for errors

3. **Import Errors**:
   - Ensure V1 packages are properly built
   - Check package.json dependencies
   - Verify workspace configuration

4. **Environment Issues**:
   - Confirm environment variables are set
   - Check .env files are not committed to git
   - Verify development vs production keys

### CLI Commands Reference:
```bash
# Login to Trigger.dev
npx trigger.dev@latest login

# Initialize project
npx trigger.dev@latest init

# Deploy jobs
npx trigger.dev@latest deploy

# Deploy to specific environment
npx trigger.dev@latest deploy --env prod

# List deployments
npx trigger.dev@latest list

# View logs
npx trigger.dev@latest logs
```

## Pricing and Limits

### Free Tier:
- **1,000 job runs** per month
- **Basic monitoring** and logs
- **Community support**

### Paid Tiers:
- **Higher job limits**
- **Advanced features** (priorities, retries)
- **Premium support**
- **SLA guarantees**

## Support Resources

- [Trigger.dev Documentation](https://trigger.dev/docs)
- [Trigger.dev Discord Community](https://discord.gg/JtBAxBr2m3)
- [GitHub Examples](https://github.com/triggerdotdev/trigger.dev)
- [Trigger.dev Status Page](https://status.trigger.dev)

## Security Best Practices

- **Keep API keys secure**: Never commit them to version control
- **Use environment variables**: Store keys in `.env` files
- **Separate environments**: Use different keys for dev/prod
- **Monitor usage**: Watch for unexpected job executions
- **Implement proper error handling**: Don't expose sensitive data in logs

---

This setup will give you a fully functional background job system integrated with your V1 project using Trigger.dev, with access to all V1 packages and services.
# Sentry Setup Instructions

This document provides step-by-step instructions for setting up Sentry error monitoring and performance tracking for the V1 project.

## Prerequisites

- A Sentry account
- Access to the V1 project codebase
- Node.js and Bun installed
- Deployed or local development environment

## 1. Create Sentry Account and Organization

1. Go to [sentry.io](https://sentry.io) and sign up for an account
2. Choose your authentication method (GitHub, Google, or email)
3. Create an organization:
   - **Organization Name**: Your company/project name
   - **Organization Slug**: URL-friendly identifier
4. Complete the onboarding process

## 2. Create Projects

The V1 project uses multiple Sentry projects for different parts of the application:

### Main Application Project:
1. In Sentry dashboard, click "Create Project"
2. Choose platform: **"Next.js"**
3. Set project details:
   - **Project Name**: "V1 App" or "V1 Frontend"
   - **Team**: Select appropriate team
4. Click "Create Project"
5. Copy the **DSN** (Data Source Name) - you'll need this for configuration

### API/Backend Project (Optional):
1. Create another project for backend monitoring
2. Choose platform: **"Node.js"** or **"JavaScript"**
3. Set project details:
   - **Project Name**: "V1 API" or "V1 Backend"
4. Copy the **DSN** for this project

## 3. Get Authentication Token

1. Go to **Settings** → **Account** → **API** → **Auth Tokens**
2. Click "Create New Token"
3. Configure token:
   - **Name**: "V1 Deploy Token" or similar
   - **Scopes**: Select:
     - `project:read`
     - `project:write` 
     - `project:releases`
     - `org:read`
4. Click "Create Token"
5. **Important**: Copy the token immediately - it won't be shown again

## 4. Configure Environment Variables

Update your environment files with Sentry configuration:

### apps/app/.env:
```bash
# Sentry Configuration
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=your-app-project-slug
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxx@sentry.io/xxxxxxx

# Optional: Environment identification
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
# or for production: NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
```

### apps/web/.env:
```bash
# Sentry Configuration
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=your-web-project-slug
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxx@sentry.io/xxxxxxx
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
```

### For Build/Deploy Process:
```bash
# Additional variables for source maps and releases
SENTRY_RELEASE=v1.0.0  # Your app version
SENTRY_UPLOAD_SOURCE_MAPS=true
```

## 5. Sentry Configuration Files

The V1 project already includes Sentry configuration files. Verify they exist:

### Configuration Files:
- `apps/app/sentry.client.config.ts` - Client-side configuration
- `apps/app/sentry.server.config.ts` - Server-side configuration  
- `apps/app/sentry.edge.config.ts` - Edge runtime configuration
- `apps/app/instrumentation.ts` - Next.js instrumentation

### Key Configuration Options:

#### Client Configuration (`sentry.client.config.ts`):
```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  tracesSampleRate: 1.0,
  debug: false,
  // Additional client options
});
```

#### Server Configuration (`sentry.server.config.ts`):
```typescript
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
  tracesSampleRate: 1.0,
  // Server-specific options
});
```

## 6. Integration with V1 Services

### Server Actions Integration:
The project uses Sentry with `next-safe-action` in `apps/app/src/actions/safe-action.ts`:

```typescript
// Sentry instrumentation is already configured in authActionClient
return Sentry.withServerActionInstrumentation(metadata.name, async () => {
  return next({
    ctx: {
      supabase,
      user,
    },
  });
});
```

### Supabase Integration:
The project includes `@supabase/sentry-js-integration` for Supabase error tracking.

## 7. Source Maps Configuration

### Automatic Upload:
The project is configured to automatically upload source maps during build:

1. **Webpack Plugin**: Sentry webpack plugin is configured in `next.config.mjs`
2. **Build Process**: Source maps are uploaded during `bun build`
3. **Release Creation**: Each deployment creates a new Sentry release

### Manual Source Map Upload (if needed):
```bash
# Upload source maps manually
npx @sentry/cli releases files $SENTRY_RELEASE upload-sourcemaps .next/static --url-prefix '~/_next/static'
```

## 8. Performance Monitoring Setup

### Enable Performance Monitoring:
1. In Sentry dashboard, go to **Performance**
2. Click "Set Up Performance Monitoring"
3. Configure performance settings:
   - **Sample Rate**: 100% for development, 10-25% for production
   - **Transaction Filters**: Configure as needed

### Transaction Monitoring:
The V1 project automatically tracks:
- **Page loads**
- **Navigation**
- **Server actions**
- **API calls**
- **Database queries** (via Supabase integration)

## 9. Error Tracking Configuration

### Automatic Error Capture:
Sentry automatically captures:
- **Unhandled exceptions**
- **Promise rejections**
- **Console errors**
- **Network errors**

### Custom Error Tracking:
```typescript
// Manual error reporting (for reference)
import * as Sentry from "@sentry/nextjs";

// Capture exceptions
Sentry.captureException(error);

// Capture messages
Sentry.captureMessage("Something went wrong", "error");

// Add context
Sentry.setUser({ id: user.id, email: user.email });
Sentry.setTag("feature", "calculator");
```

## 10. Releases and Deployment

### Automatic Release Creation:
The project creates releases automatically during deployment:

1. **Release Name**: Uses git commit SHA or version number
2. **Source Maps**: Uploaded automatically
3. **Deploy Tracking**: Tracks deployments to environments

### Manual Release Creation:
```bash
# Create a new release
npx @sentry/cli releases new v1.0.0

# Associate commits
npx @sentry/cli releases set-commits v1.0.0 --auto

# Finalize release
npx @sentry/cli releases finalize v1.0.0
```

## 11. Team and Notification Setup

### Configure Team Access:
1. Go to **Settings** → **Teams**
2. Create or configure teams for the V1 project
3. Add team members with appropriate roles:
   - **Admin**: Full access
   - **Manager**: Project management
   - **Member**: View and triage issues

### Set Up Alerts:
1. Go to **Alerts** → **Rules**
2. Create alert rules for:
   - **High error rate** (e.g., >10 errors per minute)
   - **New issues** in production
   - **Performance degradation**
   - **Release deployment** issues

### Notification Channels:
Configure notifications for:
- **Email** notifications
- **Slack** integration (if applicable)
- **Discord** webhooks (if applicable)

## 12. Dashboard and Monitoring

### Key Dashboards:
1. **Issues Dashboard**: Monitor and triage errors
2. **Performance Dashboard**: Track application performance
3. **Releases Dashboard**: Monitor deployment health
4. **User Feedback**: Track user-reported issues

### Key Metrics to Monitor:
- **Error Rate**: Errors per user session
- **Apdex Score**: Application performance index
- **Throughput**: Requests per minute
- **Response Time**: Average response times
- **User Impact**: Number of users affected by issues

## 13. Development vs Production Configuration

### Development Environment:
```bash
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
SENTRY_DEBUG=true  # Enable debug logs
SENTRY_TRACING=true  # Enable performance tracing
```

### Production Environment:
```bash
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
SENTRY_DEBUG=false  # Disable debug logs
SENTRY_TRACING=true  # Keep performance monitoring
SENTRY_TRACES_SAMPLE_RATE=0.1  # Lower sample rate for performance
```

## 14. Verify Setup

### Test Error Reporting:
1. **Trigger a test error** in your application
2. **Check Sentry dashboard** for the error
3. **Verify source maps** are working (error shows original source)
4. **Test user context** is captured correctly

### Test Performance Monitoring:
1. **Navigate through your application**
2. **Check Performance dashboard** for transactions
3. **Verify page load times** are captured
4. **Test server action monitoring**

### Test Release Tracking:
1. **Deploy your application**
2. **Verify release appears** in Sentry
3. **Check source maps** are uploaded
4. **Test deployment notifications**

## Environment Variables Reference

### Required Variables:
```bash
# Core Sentry Configuration
SENTRY_ORG=your-organization-slug
SENTRY_PROJECT=your-project-slug
SENTRY_AUTH_TOKEN=sntrys_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SENTRY_DSN=https://xxxxxxxxxxxxxxxx@sentry.io/xxxxxxx

# Environment Configuration
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development  # or production

# Optional Configuration
SENTRY_RELEASE=v1.0.0
SENTRY_UPLOAD_SOURCE_MAPS=true
SENTRY_DEBUG=false
SENTRY_TRACES_SAMPLE_RATE=1.0
```

### Environment-Specific Variables:
```bash
# Development
NEXT_PUBLIC_SENTRY_ENVIRONMENT=development
SENTRY_DEBUG=true

# Staging
NEXT_PUBLIC_SENTRY_ENVIRONMENT=staging
SENTRY_DEBUG=false

# Production
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production
SENTRY_DEBUG=false
SENTRY_TRACES_SAMPLE_RATE=0.1
```

## Troubleshooting

### Common Issues

1. **Source Maps Not Working**:
   - Verify `SENTRY_AUTH_TOKEN` is correct
   - Check build process uploads source maps
   - Ensure `SENTRY_ORG` and `SENTRY_PROJECT` match dashboard

2. **Errors Not Appearing**:
   - Verify `NEXT_PUBLIC_SENTRY_DSN` is correct
   - Check environment configuration
   - Test with a manual error trigger

3. **Performance Data Missing**:
   - Verify `tracesSampleRate` is set
   - Check performance monitoring is enabled
   - Ensure user interactions are being captured

4. **Release Issues**:
   - Verify auth token has release permissions
   - Check release name format
   - Ensure source maps are uploaded before release finalization

### CLI Commands for Debugging:
```bash
# Test authentication
npx @sentry/cli auth info

# List releases
npx @sentry/cli releases list

# Test source map upload
npx @sentry/cli releases files $RELEASE_NAME list

# Debug configuration
npx @sentry/cli info
```

## Pricing and Quotas

### Free Tier Limits:
- **5,000 errors** per month
- **10,000 performance units** per month
- **1 GB attachment storage**
- **30-day data retention**

### Paid Tier Benefits:
- **Higher error and performance quotas**
- **Extended data retention**
- **Advanced features** (custom dashboards, integrations)
- **Priority support**

## Support Resources

- [Sentry Documentation](https://docs.sentry.io)
- [Next.js Integration Guide](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
- [Sentry Discord Community](https://discord.gg/sentry)
- [GitHub Issues](https://github.com/getsentry/sentry-javascript/issues)
- [Sentry Status Page](https://status.sentry.io)

## Security Best Practices

- **Keep auth tokens secure**: Never commit them to version control
- **Use environment variables**: Store sensitive data in `.env` files
- **Rotate tokens regularly**: Generate new auth tokens periodically
- **Monitor access**: Review team access and permissions regularly
- **Filter sensitive data**: Configure data scrubbing for PII
- **Set up proper CORS**: Configure allowed origins for client-side reporting

---

This setup will give you comprehensive error monitoring, performance tracking, and release management for your V1 project using Sentry, with proper integration across all applications and environments.
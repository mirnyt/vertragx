# OpenPanel Setup Instructions

This document provides step-by-step instructions for setting up OpenPanel analytics for the V1 project.

## Prerequisites

- An OpenPanel account
- Access to the V1 project codebase
- Understanding of analytics and event tracking concepts

## 1. Create OpenPanel Account

1. Go to [openpanel.dev](https://openpanel.dev) and sign up for an account
2. Choose your authentication method (GitHub, Google, or email)
3. Complete the email verification process
4. You'll be redirected to the OpenPanel dashboard

## 2. Create a Project

1. In the OpenPanel dashboard, click "Create Project" or "New Project"
2. Configure project settings:
   - **Project Name**: "V1" or your preferred project name
   - **Website URL**: Your application URL (e.g., `https://yourdomain.com`)
   - **Description**: Optional description of your project
3. Click "Create Project"
4. You'll be taken to the project dashboard

## 3. Get Project Credentials

1. In your project dashboard, go to **"Settings"** → **"API Keys"**
2. Copy the following credentials:
   - **Client ID**: Public identifier for client-side tracking
   - **Client Secret**: Secret key for server-side operations
   - **Project ID**: Unique project identifier

### Example Credentials Format:
```
Client ID: op_client_xxxxxxxxxxxxxxxxxxxxxxxxxx
Client Secret: op_secret_yyyyyyyyyyyyyyyyyyyyyyyy
Project ID: project_zzzzzzzzzzzzzzzzzzzzz
```

## 4. Configure Environment Variables

Update your environment files with OpenPanel credentials:

### apps/app/.env:
```bash
# OpenPanel Analytics Configuration
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_xxxxxxxxxxxxxxxxxxxxxxxxxx
OPENPANEL_SECRET_KEY=op_secret_yyyyyyyyyyyyyyyyyyyyyyyy

# Optional: Project identification
NEXT_PUBLIC_OPENPANEL_PROJECT_ID=project_zzzzzzzzzzzzzzzzzzzzz
```

### apps/web/.env:
```bash
# OpenPanel Analytics Configuration
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_xxxxxxxxxxxxxxxxxxxxxxxxxx
OPENPANEL_SECRET_KEY=op_secret_yyyyyyyyyyyyyyyyyyyyyyyy
NEXT_PUBLIC_OPENPANEL_PROJECT_ID=project_zzzzzzzzzzzzzzzzzzzzz
```

### For Server-Side Tracking:
```bash
# Server-side analytics (packages/analytics)
OPENPANEL_SECRET_KEY=op_secret_yyyyyyyyyyyyyyyyyyyyyyyy
OPENPANEL_CLIENT_ID=op_client_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 5. Understanding V1's OpenPanel Integration

The V1 project uses OpenPanel through the `@v1/analytics` package with the following structure:

### Analytics Package Structure:
```
packages/analytics/
├── src/
│   ├── client.tsx      # Client-side tracking
│   ├── server.ts       # Server-side tracking
│   └── events.ts       # Event definitions
└── package.json
```

### Integration Points:
1. **Client-side tracking**: Page views, user interactions, form submissions
2. **Server-side tracking**: Server actions, API calls, background events
3. **User identification**: Track authenticated users across sessions
4. **Custom events**: Application-specific event tracking

## 6. Client-Side Analytics Setup

### Automatic Tracking:
The V1 project automatically tracks:
- **Page views**: Every page navigation
- **User sessions**: Session start/end
- **User identification**: When users sign in/out
- **Form interactions**: Form submissions and errors

### Client Component Integration:
The `@v1/analytics/client` provides:
- **Automatic page view tracking**
- **User session management**
- **Custom event tracking**
- **Privacy-compliant tracking**

## 7. Server-Side Analytics Setup

### Server Action Tracking:
The V1 project integrates OpenPanel with server actions in `apps/app/src/actions/safe-action.ts`:

```typescript
// Server-side analytics integration (for reference)
const analytics = await setupAnalytics({
  userId: user.id,
  fullName: user.full_name,
});

if (metadata.track) {
  analytics.track(metadata.track);
}
```

### Tracked Server Events:
- **User registration**: New user sign-ups
- **Authentication**: Login/logout events
- **Server actions**: All protected server action calls
- **Error events**: Server-side errors and exceptions

## 8. Event Tracking Configuration

### Standard Events:
The V1 project tracks these standard events:

#### User Events:
- `user_signup`: New user registration
- `user_login`: User authentication
- `user_logout`: User sign out
- `user_profile_update`: Profile changes

#### Application Events:
- `page_view`: Page navigation
- `form_submit`: Form submissions
- `error_occurred`: Application errors
- `feature_used`: Feature usage tracking

#### Custom Events:
- `calculator_used`: VoltAgent calculator usage
- `share_link_created`: Share link generation
- `server_action_called`: Server action executions

### Event Properties:
Each event can include properties like:
- **User ID**: Authenticated user identifier
- **Session ID**: Current session identifier
- **Page URL**: Current page location
- **User Agent**: Browser/device information
- **Custom properties**: Feature-specific data

## 9. User Identification and Profiles

### Automatic User Identification:
The V1 project automatically identifies users when they:
1. **Sign up**: Creates new user profile
2. **Sign in**: Associates session with user
3. **Update profile**: Syncs user data

### User Profile Data:
OpenPanel tracks:
- **User ID**: Unique identifier from Supabase
- **Email**: User email address
- **Name**: User's full name
- **Sign-up date**: Registration timestamp
- **Last seen**: Most recent activity

### Privacy Compliance:
- **GDPR compliant**: User consent management
- **Data minimization**: Only track necessary data
- **Anonymization**: Option to anonymize user data
- **Opt-out**: Users can opt out of tracking

## 10. Dashboard and Reporting

### Key Metrics Tracked:
1. **User Analytics**:
   - Active users (daily, weekly, monthly)
   - New user registrations
   - User retention rates
   - Session duration

2. **Feature Analytics**:
   - Feature usage frequency
   - Popular pages and flows
   - Conversion funnel analysis
   - Error rates and patterns

3. **Performance Analytics**:
   - Page load times
   - Server action performance
   - Error tracking and debugging
   - User experience metrics

### Custom Dashboards:
Create dashboards for:
- **Product metrics**: Core business KPIs
- **Technical metrics**: Performance and errors
- **User behavior**: Usage patterns and flows
- **Feature adoption**: New feature success

## 11. Development vs Production Configuration

### Development Environment:
```bash
# Development tracking
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_dev_xxxxxxxxxx
OPENPANEL_SECRET_KEY=op_secret_dev_yyyyyyyy
NEXT_PUBLIC_ANALYTICS_DEBUG=true

# Optional: Disable tracking in development
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

### Production Environment:
```bash
# Production tracking
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_prod_xxxxxxxxxx
OPENPANEL_SECRET_KEY=op_secret_prod_yyyyyyyy
NEXT_PUBLIC_ANALYTICS_DEBUG=false
NEXT_PUBLIC_ANALYTICS_ENABLED=true

# Privacy settings
NEXT_PUBLIC_ANALYTICS_RESPECT_DNT=true
```

### Staging Environment:
```bash
# Staging tracking (separate from production)
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_staging_xxxxxxxxxx
OPENPANEL_SECRET_KEY=op_secret_staging_yyyyyyyy
NEXT_PUBLIC_ANALYTICS_DEBUG=true
```

## 12. Privacy and Compliance

### GDPR Compliance:
1. **Cookie consent**: Implement cookie banner
2. **User consent**: Track only with user permission
3. **Data retention**: Configure appropriate retention periods
4. **Right to deletion**: Implement data deletion requests

### Privacy Features:
- **IP anonymization**: Anonymize user IP addresses
- **Do Not Track**: Respect browser DNT settings
- **Opt-out mechanisms**: Allow users to disable tracking
- **Data minimization**: Track only necessary information

### Cookie Configuration:
```javascript
// Example cookie consent configuration
{
  necessary: true,      // Required for functionality
  analytics: false,     // Optional analytics tracking
  marketing: false,     // Optional marketing tracking
  preferences: true     // User preference storage
}
```

## 13. Testing and Verification

### Test Event Tracking:
1. **Navigate through your application**
2. **Perform key user actions** (signup, login, feature usage)
3. **Check OpenPanel dashboard** for events
4. **Verify user identification** is working

### Debug Mode:
Enable debug mode to see tracking in browser console:
```bash
NEXT_PUBLIC_ANALYTICS_DEBUG=true
```

### Test Server-Side Tracking:
1. **Trigger server actions** with tracking metadata
2. **Check server logs** for analytics calls
3. **Verify events appear** in OpenPanel dashboard
4. **Test error tracking** with intentional errors

### Validate User Flows:
1. **Complete user registration flow**
2. **Test feature usage tracking**
3. **Verify conversion funnel tracking**
4. **Check retention tracking**

## 14. Performance Optimization

### Client-Side Optimization:
- **Lazy loading**: Load analytics asynchronously
- **Batching**: Batch multiple events
- **Caching**: Cache user identification
- **Error handling**: Graceful fallbacks

### Server-Side Optimization:
- **Background processing**: Process analytics async
- **Rate limiting**: Prevent analytics spam
- **Error resilience**: Don't break on analytics failures
- **Performance monitoring**: Track analytics impact

### Data Optimization:
- **Event sampling**: Sample high-volume events
- **Property filtering**: Include only necessary properties
- **Compression**: Compress large payloads
- **Retention policies**: Set appropriate data retention

## 15. Custom Event Implementation

### Client-Side Custom Events:
```typescript
// Example custom event tracking (for reference)
import { track } from '@v1/analytics/client';

// Track feature usage
track('calculator_used', {
  expression: '2 + 2',
  result: '4',
  timestamp: Date.now()
});

// Track user actions
track('share_link_created', {
  postId: 'post-123',
  shareType: 'public'
});
```

### Server-Side Custom Events:
```typescript
// Example server-side tracking (for reference)
import { setupAnalytics } from '@v1/analytics/server';

const analytics = await setupAnalytics({
  userId: user.id,
  fullName: user.full_name
});

analytics.track({
  event: 'server_action_completed',
  channel: 'api',
  action: 'update_profile',
  success: true
});
```

## 16. Monitoring and Alerts

### Set Up Alerts:
1. **Traffic anomalies**: Unusual traffic patterns
2. **Error spikes**: Increased error rates
3. **Conversion drops**: Funnel performance issues
4. **Performance degradation**: Slow page loads

### Key Metrics to Monitor:
- **Event volume**: Total events per day
- **User activity**: Active user trends
- **Error rates**: Analytics and application errors
- **Performance**: Page load and response times

### Dashboard Reviews:
- **Daily**: Check key metrics and alerts
- **Weekly**: Review user behavior trends
- **Monthly**: Analyze feature adoption and retention
- **Quarterly**: Evaluate overall product performance

## Environment Variables Reference

### Required Variables:
```bash
# Core OpenPanel Configuration
NEXT_PUBLIC_OPENPANEL_CLIENT_ID=op_client_xxxxxxxxxxxxxxxxxxxxxxxxxx
OPENPANEL_SECRET_KEY=op_secret_yyyyyyyyyyyyyyyyyyyyyyyy

# Optional Configuration
NEXT_PUBLIC_OPENPANEL_PROJECT_ID=project_zzzzzzzzzzzzzzzzzzzzz
NEXT_PUBLIC_ANALYTICS_DEBUG=false
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

### Privacy and Compliance:
```bash
# Privacy settings
NEXT_PUBLIC_ANALYTICS_RESPECT_DNT=true
NEXT_PUBLIC_ANALYTICS_ANONYMIZE_IP=true
NEXT_PUBLIC_ANALYTICS_COOKIE_CONSENT=true

# Data retention
OPENPANEL_DATA_RETENTION_DAYS=365
```

### Performance Settings:
```bash
# Performance optimization
NEXT_PUBLIC_ANALYTICS_BATCH_SIZE=10
NEXT_PUBLIC_ANALYTICS_FLUSH_INTERVAL=5000
OPENPANEL_TIMEOUT=5000
```

## Troubleshooting

### Common Issues

1. **Events Not Appearing**:
   - Verify Client ID and Secret Key are correct
   - Check network connectivity to OpenPanel
   - Ensure analytics is enabled in environment
   - Check browser console for errors

2. **User Identification Issues**:
   - Verify user ID is being passed correctly
   - Check authentication state
   - Ensure setupAnalytics is called after login
   - Test with known user accounts

3. **Performance Issues**:
   - Check analytics library loading
   - Monitor network requests
   - Verify batching configuration
   - Test with analytics disabled

4. **Privacy Compliance Issues**:
   - Implement proper cookie consent
   - Check GDPR compliance settings
   - Verify opt-out mechanisms
   - Test data deletion requests

### Debug Tools:
```bash
# Check analytics configuration
curl -X GET "https://api.openpanel.dev/v1/projects/YOUR_PROJECT_ID" \
  -H "Authorization: Bearer YOUR_SECRET_KEY"

# Test event sending
curl -X POST "https://api.openpanel.dev/v1/track" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_SECRET_KEY" \
  -d '{"event": "test_event", "userId": "test-user"}'
```

## Pricing and Quotas

### Free Tier Limits:
- **100,000 events** per month
- **3 months** data retention
- **Basic analytics** features
- **Community support**

### Paid Tier Benefits:
- **Higher event limits**
- **Extended data retention**
- **Advanced analytics** features
- **Custom dashboards**
- **Priority support**
- **Data export** capabilities

### Cost Optimization:
- **Event sampling**: Reduce event volume for high-traffic features
- **Smart tracking**: Track only valuable user actions
- **Data retention**: Set appropriate retention periods
- **Feature monitoring**: Monitor analytics usage and costs

## Support Resources

- [OpenPanel Documentation](https://docs.openpanel.dev)
- [OpenPanel GitHub](https://github.com/Openpanel-dev/openpanel)
- [OpenPanel Discord Community](https://discord.gg/openpanel)
- [Analytics Best Practices](https://docs.openpanel.dev/guides/best-practices)
- [Privacy Compliance Guide](https://docs.openpanel.dev/guides/privacy)

## Security Best Practices

- **Keep secret keys secure**: Never expose in client-side code
- **Use environment variables**: Store credentials in `.env` files
- **Rotate keys regularly**: Generate new keys periodically
- **Monitor access**: Review analytics access logs
- **Implement rate limiting**: Prevent analytics abuse
- **Data encryption**: Ensure data is encrypted in transit and at rest

## Integration Best Practices

### Event Design:
- **Consistent naming**: Use clear, consistent event names
- **Meaningful properties**: Include relevant context
- **Avoid PII**: Don't track sensitive personal information
- **Version events**: Plan for event schema evolution

### Implementation:
- **Error handling**: Graceful fallbacks for analytics failures
- **Performance**: Don't impact core application performance
- **Testing**: Test analytics in all environments
- **Documentation**: Document tracked events and properties

---

This setup will give you comprehensive analytics tracking for your V1 project using OpenPanel, with privacy-compliant user tracking, feature analytics, and performance monitoring across all applications and environments.
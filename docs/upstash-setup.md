# Upstash Setup Instructions

This document provides step-by-step instructions for setting up Upstash Redis for caching and rate limiting in the V1 project.

## Prerequisites

- An Upstash account
- Access to the V1 project codebase
- Understanding of Redis concepts (optional but helpful)

## 1. Create Upstash Account

1. Go to [upstash.com](https://upstash.com) and sign up for an account
2. Choose your authentication method (GitHub, Google, or email)
3. Complete the email verification process
4. You'll be redirected to the Upstash console

## 2. Create a Redis Database

### Development Database:
1. In the Upstash console, click "Create Database"
2. Configure database settings:
   - **Name**: "v1-development" or "v1-dev"
   - **Type**: Select "Regional" (recommended for most use cases)
   - **Region**: Choose the region closest to your application deployment
   - **Eviction**: Select "allkeys-lru" (recommended for caching)
3. Click "Create"
4. Wait for database creation (usually takes 1-2 minutes)

### Production Database:
1. Create another database for production
2. Configure database settings:
   - **Name**: "v1-production" or "v1-prod"
   - **Type**: Select "Regional" or "Global" (Global for multi-region deployments)
   - **Region**: Match your production deployment region
   - **Eviction**: Select "allkeys-lru"
3. Click "Create"

## 3. Get Database Credentials

For each database (development and production):

1. Click on your database name in the console
2. Go to the **"Details"** tab
3. Copy the following credentials:
   - **Endpoint**: Redis connection URL
   - **REST URL**: HTTP REST API endpoint
   - **REST Token**: Authentication token for REST API
   - **Password**: Redis password (if using direct Redis connection)

### Example Credentials Format:
```
Endpoint: redis-12345.upstash.io:6379
REST URL: https://redis-12345.upstash.io
REST Token: AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
Password: abc123def456ghi789
```

## 4. Configure Environment Variables

Update your environment files with Upstash credentials:

### apps/app/.env:
```bash
# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=https://redis-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx

# Optional: Direct Redis connection (if needed)
UPSTASH_REDIS_URL=redis://default:abc123def456ghi789@redis-12345.upstash.io:6379
```

### apps/web/.env:
```bash
# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=https://redis-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

### packages/kv/.env (if applicable):
```bash
# Upstash Redis Configuration
UPSTASH_REDIS_REST_URL=https://redis-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx
```

## 5. Understanding V1's Upstash Integration

The V1 project uses Upstash for two main purposes:

### Rate Limiting (`packages/kv/src/ratelimit.ts`):
- **Server actions protection**: Prevents abuse of API endpoints
- **User-based limits**: Rate limiting per user or IP address
- **Configurable windows**: Different limits for different actions

### Caching (`packages/kv/src/index.ts`):
- **Database query caching**: Cache expensive database operations
- **Session storage**: Store temporary user session data
- **API response caching**: Cache external API responses

## 6. Rate Limiting Configuration

### Understanding Rate Limiting in V1:
The project uses `@upstash/ratelimit` with the following patterns:

#### Rate Limit Types:
1. **Sliding Window**: Smooth rate limiting over time
2. **Fixed Window**: Reset limits at fixed intervals
3. **Token Bucket**: Burst capacity with refill rate

#### Default Configuration:
```typescript
// Example rate limiting setup (for reference)
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
  analytics: true,
});
```

### Rate Limiting in Server Actions:
The V1 project applies rate limiting in `apps/app/src/actions/safe-action.ts`:
- **Per IP**: Limits requests per IP address
- **Per User**: Limits requests per authenticated user
- **Per Action**: Different limits for different server actions

## 7. Caching Strategies

### Cache Patterns Used in V1:

#### 1. Database Query Caching:
```typescript
// Example caching pattern (for reference)
const cacheKey = `user:${userId}:profile`;
let userData = await redis.get(cacheKey);

if (!userData) {
  userData = await fetchUserFromDatabase(userId);
  await redis.setex(cacheKey, 3600, JSON.stringify(userData)); // Cache for 1 hour
}
```

#### 2. Session Caching:
- **User sessions**: Store authentication state
- **Temporary data**: Store form data, wizard states
- **Flash messages**: Store one-time notifications

#### 3. API Response Caching:
- **External API calls**: Cache responses to reduce API usage
- **Computed results**: Cache expensive calculations
- **Static content**: Cache rarely changing data

## 8. Monitoring and Analytics

### Upstash Console Monitoring:
1. Go to your database in the Upstash console
2. Check the **"Metrics"** tab for:
   - **Request count**: Number of operations
   - **Data usage**: Memory consumption
   - **Latency**: Response times
   - **Error rates**: Failed operations

### Built-in Analytics:
Upstash provides analytics for:
- **Commands executed**
- **Memory usage over time**
- **Connection statistics**
- **Geographic distribution** (for Global databases)

### Rate Limiting Analytics:
The `@upstash/ratelimit` library provides analytics:
- **Rate limit hits**: How often limits are reached
- **Request patterns**: Peak usage times
- **Blocked requests**: Requests that were rate limited

## 9. Database Configuration Options

### Memory Optimization:
1. **Eviction Policy**: Configure how Redis handles memory pressure
   - `allkeys-lru`: Remove least recently used keys
   - `allkeys-lfu`: Remove least frequently used keys
   - `noeviction`: Return errors when memory is full

2. **Max Memory**: Set appropriate memory limits for your use case

### Persistence Options:
- **Standard**: Data persisted to disk
- **Durable**: Enhanced persistence with backup
- **Memory-only**: No persistence (fastest, data lost on restart)

### Security Settings:
1. **TLS Encryption**: Always enabled for data in transit
2. **Authentication**: Required for all connections
3. **Network Access**: Configure IP allowlists if needed

## 10. Development vs Production Setup

### Development Environment:
```bash
# Development database (smaller, cheaper)
UPSTASH_REDIS_REST_URL=https://redis-dev-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=DEV_TOKEN_HERE

# Optional: More verbose logging
UPSTASH_REDIS_DEBUG=true
```

### Production Environment:
```bash
# Production database (optimized for performance)
UPSTASH_REDIS_REST_URL=https://redis-prod-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=PROD_TOKEN_HERE

# Production optimizations
UPSTASH_REDIS_TIMEOUT=5000
UPSTASH_REDIS_RETRY_ATTEMPTS=3
```

## 11. Testing and Verification

### Test Redis Connection:
```bash
# Using curl to test REST API
curl -X GET \
  "https://redis-12345.upstash.io/ping" \
  -H "Authorization: Bearer YOUR_REST_TOKEN"

# Expected response: "PONG"
```

### Test Rate Limiting:
1. **Make rapid requests** to a rate-limited endpoint
2. **Verify rate limiting** kicks in after threshold
3. **Check Upstash console** for rate limit analytics

### Test Caching:
1. **Make a request** that should be cached
2. **Make the same request again** (should be faster)
3. **Check cache hit rates** in monitoring

### Test Error Handling:
1. **Use invalid credentials** to test error handling
2. **Simulate network issues** to test retries
3. **Test fallback behavior** when Redis is unavailable

## 12. Performance Optimization

### Connection Optimization:
- **Connection pooling**: Reuse connections when possible
- **Keep-alive**: Maintain persistent connections
- **Timeout configuration**: Set appropriate timeouts

### Data Optimization:
- **Key naming**: Use consistent, efficient key naming patterns
- **Data serialization**: Use efficient serialization (JSON, MessagePack)
- **TTL management**: Set appropriate expiration times

### Geographic Optimization:
- **Regional databases**: Use databases close to your users
- **Global databases**: For worldwide applications
- **Edge caching**: Combine with CDN for optimal performance

## 13. Backup and Recovery

### Automatic Backups:
- **Daily snapshots**: Automatic daily backups
- **Point-in-time recovery**: Restore to specific timestamps
- **Cross-region replication**: For disaster recovery

### Manual Backup:
1. Go to your database in Upstash console
2. Navigate to **"Backup"** section
3. Create manual snapshots before major changes
4. Download backup files if needed

## 14. Security Best Practices

### Token Management:
- **Rotate tokens regularly**: Generate new tokens periodically
- **Use environment variables**: Never commit tokens to code
- **Separate environments**: Different tokens for dev/staging/prod
- **Least privilege**: Use minimal required permissions

### Network Security:
- **IP allowlisting**: Restrict access to known IP ranges
- **VPC integration**: Use private networks when possible
- **TLS encryption**: Always use HTTPS/TLS connections

### Data Security:
- **Sensitive data**: Don't cache sensitive information
- **Data encryption**: Additional encryption for highly sensitive data
- **Access logging**: Monitor access patterns

## Environment Variables Reference

### Required Variables:
```bash
# Core Upstash Configuration
UPSTASH_REDIS_REST_URL=https://redis-12345.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXx

# Optional: Direct Redis connection
UPSTASH_REDIS_URL=redis://default:password@redis-12345.upstash.io:6379
```

### Optional Configuration:
```bash
# Performance tuning
UPSTASH_REDIS_TIMEOUT=5000
UPSTASH_REDIS_RETRY_ATTEMPTS=3
UPSTASH_REDIS_RETRY_DELAY=100

# Development settings
UPSTASH_REDIS_DEBUG=true

# Rate limiting configuration
UPSTASH_RATELIMIT_ANALYTICS=true
```

## Troubleshooting

### Common Issues

1. **Connection Timeouts**:
   - Check network connectivity
   - Verify REST URL and token
   - Increase timeout values
   - Check Upstash status page

2. **Authentication Errors**:
   - Verify REST token is correct
   - Check token hasn't expired
   - Ensure proper Authorization header format

3. **Rate Limiting Not Working**:
   - Verify Upstash connection
   - Check rate limit configuration
   - Monitor rate limit analytics
   - Test with burst requests

4. **Cache Misses**:
   - Check TTL settings
   - Verify cache key consistency
   - Monitor memory usage
   - Check eviction policy

5. **High Latency**:
   - Choose closer geographic region
   - Optimize data serialization
   - Use connection pooling
   - Monitor network performance

### Debugging Commands:
```bash
# Test connection
curl -X GET "https://redis-12345.upstash.io/ping" \
  -H "Authorization: Bearer YOUR_TOKEN"

# Get database info
curl -X GET "https://redis-12345.upstash.io/info" \
  -H "Authorization: Bearer YOUR_TOKEN"

# List all keys (development only)
curl -X GET "https://redis-12345.upstash.io/keys/*" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Pricing and Quotas

### Free Tier Limits:
- **10,000 requests** per day
- **256 MB** storage
- **1 database**
- **Regional** deployment only

### Paid Tier Benefits:
- **Higher request limits**
- **More storage**
- **Multiple databases**
- **Global deployment options**
- **Advanced analytics**
- **Priority support**

### Cost Optimization:
- **Right-size databases**: Choose appropriate memory limits
- **Optimize TTL**: Reduce unnecessary data retention
- **Monitor usage**: Track requests and storage
- **Use caching efficiently**: Balance hit rates and memory usage

## Support Resources

- [Upstash Documentation](https://docs.upstash.com)
- [Redis Commands Reference](https://redis.io/commands)
- [Upstash Discord Community](https://discord.gg/w9SenAtbme)
- [GitHub Examples](https://github.com/upstash/upstash-redis)
- [Upstash Status Page](https://status.upstash.com)

## Integration Examples

### Rate Limiting Integration:
The V1 project integrates rate limiting in server actions to protect against abuse while maintaining good user experience.

### Caching Integration:
The V1 project uses caching to improve performance for database queries, API responses, and computed results.

### Session Management:
The project uses Redis for temporary session storage, flash messages, and user state management.

---

This setup will give you a fully functional Redis caching and rate limiting system integrated with your V1 project using Upstash, providing scalable performance optimization and protection against abuse.
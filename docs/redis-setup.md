# Redis Cloud Setup Instructions

This document provides step-by-step instructions for setting up Redis Cloud as an alternative to Upstash for the V1 project.

## Prerequisites

- A Redis Cloud account
- Access to the V1 project codebase
- Understanding of Redis concepts and caching strategies

## 1. Create Redis Cloud Account

1. Go to [redis.com](https://redis.com) and click "Get Started Free"
2. Choose your authentication method (GitHub, Google, or email)
3. Complete the email verification process
4. Choose your plan:
   - **Free Plan**: 30MB storage, shared resources
   - **Paid Plans**: Higher storage, dedicated resources, advanced features
5. You'll be redirected to the Redis Cloud console

## 2. Create a Database

### Development Database:
1. In the Redis Cloud console, click "New Database"
2. Choose your subscription (or create a new one)
3. Configure database settings:
   - **Database Name**: "v1-development" or "v1-dev"
   - **Memory**: Start with 30MB (free tier) or appropriate size
   - **Region**: Choose the region closest to your application
   - **High Availability**: Disabled for development (to save costs)
   - **Data Persistence**: Choose based on your needs
   - **Modules**: Select any Redis modules if needed (RedisJSON, RediSearch, etc.)
4. Click "Create Database"
5. Wait for database creation (usually takes 2-5 minutes)

### Production Database:
1. Create another database for production
2. Configure database settings:
   - **Database Name**: "v1-production" or "v1-prod"
   - **Memory**: Size based on your production needs
   - **Region**: Match your production deployment region
   - **High Availability**: Enable for production reliability
   - **Data Persistence**: Enable for data durability
   - **Security**: Configure TLS and password authentication
3. Click "Create Database"

## 3. Get Database Connection Details

For each database (development and production):

1. Click on your database name in the console
2. Go to the **"Configuration"** tab
3. Copy the following connection details:
   - **Public Endpoint**: Redis connection URL with port
   - **Private Endpoint**: Internal network URL (if applicable)
   - **Password**: Database password
   - **Port**: Redis port number (usually 6379 or custom)
   - **SSL Port**: Secure connection port (if TLS is enabled)

### Example Connection Details:
```
Public Endpoint: redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:12345
Password: your-secure-password-here
Port: 12345
SSL Port: 12346
```

## 4. Configure Environment Variables

Update your environment files with Redis Cloud credentials:

### apps/app/.env:
```bash
# Redis Cloud Configuration
REDIS_URL=redis://:your-password@redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:12345
REDIS_HOST=redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com
REDIS_PORT=12345
REDIS_PASSWORD=your-secure-password-here

# TLS Configuration (if using SSL)
REDIS_TLS_URL=rediss://:your-password@redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:12346
REDIS_USE_TLS=true
```

### apps/web/.env:
```bash
# Redis Cloud Configuration
REDIS_URL=redis://:your-password@redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:12345
REDIS_HOST=redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com
REDIS_PORT=12345
REDIS_PASSWORD=your-secure-password-here
```

### packages/kv/.env (if using with V1's KV package):
```bash
# Redis Cloud Configuration
REDIS_URL=redis://:your-password@redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com:12345
REDIS_HOST=redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com
REDIS_PORT=12345
REDIS_PASSWORD=your-secure-password-here
```

## 5. Adapting V1's Upstash Integration to Redis Cloud

The V1 project is configured for Upstash Redis, but can be adapted for Redis Cloud:

### Current V1 Integration (`packages/kv/`):
- **Rate limiting**: Uses `@upstash/ratelimit` and `@upstash/redis`
- **Caching**: Uses Upstash REST API
- **Configuration**: Designed for Upstash-specific features

### Adaptation Required:
To use Redis Cloud instead of Upstash, you'll need to:

1. **Replace Upstash clients** with standard Redis clients
2. **Update rate limiting** to use Redis Cloud compatible libraries
3. **Modify connection logic** for Redis Cloud URLs
4. **Update environment variables** as shown above

### Alternative Redis Clients:
Consider these Redis clients for Redis Cloud:
- **ioredis**: Popular Node.js Redis client
- **redis**: Official Redis Node.js client
- **node-redis**: Another popular Redis client option

## 6. Security Configuration

### TLS/SSL Setup:
1. In Redis Cloud console, go to your database
2. Navigate to **"Security"** tab
3. Enable **"TLS"** for encrypted connections
4. Download or note the TLS certificate details if required
5. Update your connection URLs to use `rediss://` (note the double 's')

### Password Management:
1. Use strong, unique passwords for each database
2. Rotate passwords regularly
3. Store passwords securely in environment variables
4. Never commit passwords to version control

### Network Security:
1. **IP Allowlisting**: Configure allowed IP addresses
   - Go to **"Security"** → **"IP Allowlist"**
   - Add your application server IPs
   - Add your development machine IPs
2. **VPC Peering**: For enterprise deployments
3. **Private Endpoints**: Use internal network connections when possible

## 7. Performance Configuration

### Memory Optimization:
1. **Memory Policy**: Configure eviction policies
   - `allkeys-lru`: Remove least recently used keys
   - `allkeys-lfu`: Remove least frequently used keys
   - `volatile-lru`: Remove LRU keys with TTL
   - `noeviction`: Return errors when memory is full
2. **Memory Limits**: Set appropriate memory thresholds
3. **Key Expiration**: Use TTL for automatic cleanup

### Connection Optimization:
1. **Connection Pooling**: Configure connection pools
2. **Keep-Alive**: Enable TCP keep-alive
3. **Timeout Settings**: Set appropriate connection timeouts
4. **Retry Logic**: Implement connection retry mechanisms

### Data Optimization:
1. **Serialization**: Choose efficient serialization (JSON, MessagePack)
2. **Compression**: Enable data compression if available
3. **Key Design**: Use efficient key naming patterns
4. **Data Structures**: Choose appropriate Redis data types

## 8. Monitoring and Alerting

### Redis Cloud Console Monitoring:
1. **Metrics Dashboard**: Monitor key performance indicators
   - **Memory Usage**: Track memory consumption
   - **Operations/sec**: Monitor request rate
   - **Latency**: Track response times
   - **Hit Rate**: Monitor cache effectiveness
   - **Connected Clients**: Track connection usage

2. **Alerts Configuration**:
   - **Memory Usage**: Alert when memory usage is high
   - **Connection Limits**: Alert when approaching connection limits
   - **Latency Spikes**: Alert on performance degradation
   - **Error Rates**: Alert on increased error rates

### Custom Monitoring:
1. **Application Metrics**: Track cache hit/miss rates
2. **Performance Metrics**: Monitor response times
3. **Error Tracking**: Log Redis connection errors
4. **Health Checks**: Implement Redis health monitoring

## 9. Backup and Data Persistence

### Backup Configuration:
1. **Automatic Backups**:
   - Go to **"Configuration"** → **"Backups"**
   - Enable automatic backups
   - Configure backup frequency (daily, weekly)
   - Set backup retention period

2. **Manual Backups**:
   - Create on-demand backups before major changes
   - Download backup files for local storage
   - Test backup restoration procedures

### Data Persistence Options:
1. **RDB (Redis Database)**: Point-in-time snapshots
2. **AOF (Append Only File)**: Log of all write operations
3. **Hybrid**: Combination of RDB and AOF
4. **No Persistence**: Memory-only for maximum performance

## 10. Development vs Production Setup

### Development Environment:
```bash
# Development database (smaller, basic features)
REDIS_URL=redis://:dev-password@redis-dev-12345.cloud.redislabs.com:12345
REDIS_USE_TLS=false
REDIS_DEBUG=true

# Connection pool settings
REDIS_MAX_CONNECTIONS=10
REDIS_IDLE_TIMEOUT=30000
```

### Production Environment:
```bash
# Production database (optimized for performance and reliability)
REDIS_TLS_URL=rediss://:prod-password@redis-prod-12345.cloud.redislabs.com:12346
REDIS_USE_TLS=true
REDIS_DEBUG=false

# Production optimizations
REDIS_MAX_CONNECTIONS=50
REDIS_IDLE_TIMEOUT=60000
REDIS_CONNECT_TIMEOUT=5000
REDIS_COMMAND_TIMEOUT=3000
```

### Staging Environment:
```bash
# Staging database (production-like configuration)
REDIS_URL=redis://:staging-password@redis-staging-12345.cloud.redislabs.com:12345
REDIS_USE_TLS=true
REDIS_DEBUG=false
```

## 11. Testing and Verification

### Connection Testing:
```bash
# Test connection using Redis CLI (if installed)
redis-cli -h redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com -p 12345 -a your-password ping

# Expected response: PONG
```

### Application Testing:
1. **Basic Operations**: Test SET/GET operations
2. **TTL Testing**: Verify key expiration works
3. **Connection Pooling**: Test multiple concurrent connections
4. **Error Handling**: Test behavior when Redis is unavailable
5. **Performance**: Benchmark operation latency

### Load Testing:
1. **Concurrent Connections**: Test maximum connection limits
2. **Throughput**: Test operations per second
3. **Memory Usage**: Monitor memory consumption under load
4. **Failover**: Test high availability scenarios

## 12. Migration from Upstash (if applicable)

### Data Migration:
1. **Export Data**: Export data from Upstash Redis
2. **Import Data**: Import data to Redis Cloud
3. **Verify Data**: Ensure all data migrated correctly
4. **Test Application**: Verify application works with new Redis

### Code Migration:
1. **Update Dependencies**: Replace Upstash-specific packages
2. **Modify Connection Logic**: Update Redis connection code
3. **Update Environment Variables**: Change to Redis Cloud credentials
4. **Test Functionality**: Verify all Redis operations work

### Gradual Migration:
1. **Parallel Operation**: Run both Upstash and Redis Cloud temporarily
2. **Feature Flags**: Gradually switch features to Redis Cloud
3. **Monitor Performance**: Compare performance between services
4. **Complete Switch**: Fully migrate once confident

## 13. Cost Optimization

### Free Tier Optimization:
- **30MB Memory**: Optimize for small memory footprint
- **Single Database**: Use one database for development
- **Basic Features**: Use core Redis features only
- **Monitor Usage**: Track memory and operation usage

### Paid Tier Optimization:
- **Right-size Memory**: Choose appropriate memory allocation
- **Reserved Instances**: Use reserved capacity for discounts
- **Regional Selection**: Choose cost-effective regions
- **Feature Selection**: Enable only necessary Redis modules

### Usage Monitoring:
1. **Memory Tracking**: Monitor memory usage trends
2. **Operation Counting**: Track operations per second
3. **Cost Alerts**: Set up billing alerts
4. **Usage Reports**: Review monthly usage reports

## Environment Variables Reference

### Required Variables:
```bash
# Basic Redis Cloud Configuration
REDIS_URL=redis://:password@host:port
REDIS_HOST=redis-12345.c1.us-east-1-1.ec2.cloud.redislabs.com
REDIS_PORT=12345
REDIS_PASSWORD=your-secure-password

# TLS Configuration
REDIS_TLS_URL=rediss://:password@host:sslport
REDIS_USE_TLS=true
```

### Optional Configuration:
```bash
# Connection Pool Settings
REDIS_MAX_CONNECTIONS=50
REDIS_IDLE_TIMEOUT=60000
REDIS_CONNECT_TIMEOUT=5000
REDIS_COMMAND_TIMEOUT=3000

# Performance Settings
REDIS_RETRY_ATTEMPTS=3
REDIS_RETRY_DELAY=100
REDIS_KEEP_ALIVE=true

# Debug Settings
REDIS_DEBUG=false
REDIS_LOG_LEVEL=warn
```

## Troubleshooting

### Common Issues

1. **Connection Timeouts**:
   - Check network connectivity
   - Verify host and port are correct
   - Check firewall settings
   - Increase connection timeout values

2. **Authentication Errors**:
   - Verify password is correct
   - Check password hasn't been rotated
   - Ensure proper URL encoding for special characters
   - Test connection with Redis CLI

3. **Memory Issues**:
   - Check memory usage in console
   - Verify eviction policy is appropriate
   - Monitor for memory leaks
   - Consider upgrading memory allocation

4. **Performance Issues**:
   - Check network latency to Redis Cloud
   - Monitor connection pool usage
   - Verify efficient key design
   - Check for N+1 query patterns

5. **TLS/SSL Issues**:
   - Verify TLS is enabled on database
   - Check certificate validity
   - Ensure correct SSL port is used
   - Test with and without TLS

### Debugging Commands:
```bash
# Test basic connectivity
redis-cli -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD ping

# Check Redis info
redis-cli -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD info

# Monitor Redis operations
redis-cli -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD monitor

# Check memory usage
redis-cli -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD info memory
```

## Support Resources

- [Redis Cloud Documentation](https://docs.redis.com/latest/rc/)
- [Redis Commands Reference](https://redis.io/commands)
- [Redis Cloud Support](https://redis.com/company/support/)
- [Redis Community Forum](https://forum.redis.com)
- [Redis GitHub Repository](https://github.com/redis/redis)

## Performance Benchmarking

### Benchmark Tools:
1. **redis-benchmark**: Built-in benchmarking tool
2. **Custom benchmarks**: Application-specific performance tests
3. **Load testing**: Simulate production traffic patterns

### Key Metrics:
- **Latency**: Average response time
- **Throughput**: Operations per second
- **Memory Efficiency**: Data storage optimization
- **Connection Performance**: Connection establishment time

### Benchmark Commands:
```bash
# Basic throughput test
redis-benchmark -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD -t set,get -n 10000

# Latency test
redis-benchmark -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD --latency

# Memory benchmark
redis-benchmark -h YOUR_HOST -p YOUR_PORT -a YOUR_PASSWORD -t set -r 100000 -n 100000
```

---

This setup will give you a fully functional Redis Cloud instance for caching and data storage in your V1 project, providing a scalable alternative to Upstash with enterprise-grade features and reliability.
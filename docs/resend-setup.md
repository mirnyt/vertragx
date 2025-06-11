# Resend Setup Instructions

This document provides step-by-step instructions for setting up Resend email service for the V1 project.

## Prerequisites

- A Resend account
- A verified domain (recommended for production)
- Access to the V1 project codebase

## 1. Create Resend Account

1. Go to [resend.com](https://resend.com) and sign up for an account
2. Verify your email address
3. Complete the onboarding process

## 2. Get API Key

1. In your Resend dashboard, go to **API Keys**
2. Click "Create API Key"
3. Enter a name for your API key (e.g., "V1 Production" or "V1 Development")
4. Select the appropriate permissions:
   - **Sending access**: Required for sending emails
   - **Domain access**: Required if managing domains via API
5. Click "Create"
6. **Important**: Copy the API key immediately - it won't be shown again
7. Store it securely (you'll need it for environment variables)

## 3. Domain Setup (Recommended for Production)

### Option A: Use Resend Domain (Quick Start)
- You can use Resend's shared domain `onboarding@resend.dev` for testing
- No additional setup required
- Limited to 100 emails/day on free tier

### Option B: Add Your Own Domain (Recommended)
1. In Resend dashboard, go to **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `yourdomain.com`)
4. Click "Add"
5. Configure DNS records as shown:

#### Required DNS Records:
```
Type: MX
Name: @ (or your domain)
Value: feedback-smtp.resend.dev
Priority: 10

Type: TXT  
Name: @ (or your domain)
Value: "v=spf1 include:_spf.resend.dev ~all"

Type: TXT
Name: _dmarc
Value: "v=DMARC1; p=none; rua=mailto:dmarc@yourdomain.com"

Type: CNAME
Name: resend._domainkey
Value: resend._domainkey.resend.dev
```

6. Wait for DNS propagation (can take up to 48 hours)
7. Verify domain status in Resend dashboard

## 4. Configure Environment Variables

Update your environment files with the Resend API key:

### apps/app/.env:
```bash
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### apps/web/.env:
```bash
# Resend  
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### For Edge Functions (apps/api/.env):
```bash
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## 5. Email Templates Setup

The project uses React Email for templates. Templates are located in:
- `packages/email/emails/welcome.tsx`
- `packages/email/components/logo.tsx`

### Configure From Address
Update the from address in your email functions to match your verified domain:

```typescript
// If using your own domain:
from: 'noreply@yourdomain.com'

// If using Resend's domain (testing):
from: 'onboarding@resend.dev'
```

## 6. Test Email Functionality

### Basic Test
1. Start your development server: `bun dev`
2. Sign up for a new account
3. Check that welcome email is sent successfully
4. Verify email appears in your inbox

### Debug Mode
Enable Resend debugging by checking the dashboard:
1. Go to **Logs** in Resend dashboard
2. Monitor email sending attempts
3. Check for any delivery issues or bounces

## 7. Production Configuration

### Rate Limits
Understand Resend's rate limits:
- **Free tier**: 100 emails/day, 3,000 emails/month
- **Pro tier**: 50,000 emails/month, higher daily limits
- **Enterprise**: Custom limits

### Best Practices
1. **Use your own domain** for better deliverability
2. **Set up proper SPF, DKIM, and DMARC** records
3. **Monitor bounce rates** and unsubscribes
4. **Use transactional email best practices**
5. **Test thoroughly** before production deployment

## 8. Email Types in V1 Project

The project includes these email types:

### Welcome Email
- **Trigger**: New user registration
- **Template**: `packages/email/emails/welcome.tsx`
- **Function**: `apps/api/supabase/functions/send-email/index.ts`

### Future Email Types (Extendable)
- Password reset emails
- Notification emails
- Marketing emails (with proper consent)

## Environment Variables Reference

### Required Variables:
```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### Optional Variables:
```bash
# Custom from address (if using your domain)
RESEND_FROM_EMAIL=noreply@yourdomain.com

# For development debugging
RESEND_DEBUG=true
```

## 9. Verify Setup

1. **Test API Key**: 
   ```bash
   curl -X POST 'https://api.resend.com/emails' \
     -H 'Authorization: Bearer YOUR_API_KEY' \
     -H 'Content-Type: application/json' \
     -d '{
       "from": "onboarding@resend.dev",
       "to": "your-email@example.com",
       "subject": "Test Email",
       "text": "This is a test email from Resend!"
     }'
   ```

2. **Test Welcome Email**:
   - Register a new user in your application
   - Check email delivery in Resend dashboard
   - Verify email received in inbox

3. **Check Dashboard Metrics**:
   - Go to Resend dashboard
   - Monitor delivery rates
   - Check for any bounces or complaints

## Troubleshooting

### Common Issues

1. **API Key Invalid**:
   - Verify API key is correctly copied
   - Check environment variable is loaded
   - Ensure no extra spaces or characters

2. **Emails Not Sending**:
   - Check Resend dashboard logs
   - Verify from address is correct
   - Ensure API key has sending permissions

3. **Emails Going to Spam**:
   - Set up proper DNS records (SPF, DKIM, DMARC)
   - Use your own verified domain
   - Follow email content best practices

4. **Rate Limit Exceeded**:
   - Check current usage in dashboard
   - Upgrade plan if needed
   - Implement email queuing for high volume

### DNS Verification Issues
- **Wait for propagation**: DNS changes can take up to 48 hours
- **Check records**: Use tools like `dig` or online DNS checkers
- **Contact support**: Resend support can help verify setup

## Support Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email)
- [Resend Status Page](https://status.resend.com)
- [Resend Support](https://resend.com/support)

## Security Notes

- **Keep API keys secure**: Never commit them to version control
- **Use environment variables**: Store keys in `.env` files
- **Rotate keys regularly**: Generate new keys periodically
- **Monitor usage**: Watch for unexpected email sending

---

This setup will give you a fully functional email service integrated with your V1 project using Resend and React Email templates.
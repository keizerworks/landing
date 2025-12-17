# Resend Email Setup Guide

This guide will walk you through setting up Resend for your contact form.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Click **"Sign Up"** or **"Get Started"**
3. Sign up with your email address or GitHub account
4. Verify your email address if required

## Step 2: Get Your API KeyBy clicking submit, you agree to our terms of service and privacy policy. We'll review your inquiry and get back to you within 24-48 hours.̌

1. After logging in, go to the **API Keys** section in your dashboard
2. Click **"Create API Key"**
3. Give it a name (e.g., "Landing Page Contact Form")
4. Select the permissions (you need **"Send emails"** permission)
5. Click **"Add"**
6. **IMPORTANT**: Copy the API key immediately - you won't be able to see it again!

## Step 3: Choose Your Email Setup

You have two options:

### Option A: Use Resend's Default Domain (Quick Setup - For Testing)

Resend provides a default domain like `onboarding@resend.dev` that you can use for testing. However, this has limitations:
- Emails might go to spam
- Limited to 100 emails/day on free tier
- Not recommended for production

**For testing, you can use:**
- From: `onboarding@resend.dev` (or any email from resend.dev domain)
- To: Your personal email

### Option B: Verify Your Own Domain (Recommended for Production)

1. Go to **Domains** in your Resend dashboard
2. Click **"Add Domain"**
3. Enter your domain (e.g., `keizerworks.com`)
4. Resend will provide DNS records to add:
   - **SPF record** (for authentication)
   - **DKIM record** (for signing)
   - **DMARC record** (optional, for security)
5. Add these records to your domain's DNS settings
6. Wait for verification (usually 5-10 minutes)
7. Once verified, you can send from any email on that domain

## Step 4: Set Up Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add the following variables:

```env
# Resend Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
RESEND_FROM_EMAIL=karan.kendre@keizerworks.com
RESEND_TO_EMAIL=karankendreg@gmail.com
```

**Important Notes:**
- Replace `re_xxxxxxxxxxxxxxxxxxxxx` with your actual API key from Step 2
- `RESEND_FROM_EMAIL` must be from a verified domain (or use `onboarding@resend.dev` for testing)
- `RESEND_TO_EMAIL` is where contact form submissions will be sent
- Never commit `.env.local` to git (it should be in `.gitignore`)

## Step 5: Test Your Setup

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Navigate to your contact form page (`/contact`)

3. Fill out and submit the form

4. Check:
   - Your terminal/console for any errors
   - The email inbox specified in `RESEND_TO_EMAIL`
   - Resend dashboard → **Logs** section to see email status

## Troubleshooting

### Error: "Invalid API Key"
- Make sure you copied the full API key (starts with `re_`)
- Check for extra spaces or line breaks
- Verify the key is active in your Resend dashboard

### Error: "Domain not verified"
- If using your own domain, verify it's fully verified in Resend dashboard
- Check DNS records are correctly added
- Wait a few minutes for DNS propagation

### Emails going to spam
- Use a verified custom domain (not `resend.dev`)
- Set up SPF, DKIM, and DMARC records properly
- Avoid spam trigger words in subject/content

### Rate Limit Errors
- Free tier: 100 emails/day, 3 emails/second
- Upgrade to paid plan for higher limits

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard:
   - Go to your project settings
   - Find "Environment Variables" section
   - Add all three variables:
     - `RESEND_API_KEY`
     - `RESEND_FROM_EMAIL`
     - `RESEND_TO_EMAIL`

2. Make sure your domain is verified in Resend

3. Test the form after deployment

## Resend Dashboard Features

- **Logs**: See all sent emails and their status
- **API Keys**: Manage your API keys
- **Domains**: Manage verified domains
- **Webhooks**: Set up webhooks for email events (optional)
- **Analytics**: View email delivery statistics

## Free Tier Limits

- 3,000 emails/month
- 100 emails/day
- 3 emails/second
- Unlimited domains
- Email API access

For higher limits, check Resend's pricing page.

## Security Best Practices

1. ✅ Never commit API keys to git
2. ✅ Use environment variables for all sensitive data
3. ✅ Rotate API keys periodically
4. ✅ Use different API keys for development and production
5. ✅ Monitor your Resend dashboard for suspicious activity
6. ✅ Set up rate limiting (already implemented in your code)

## Need Help?

- Resend Documentation: [https://resend.com/docs](https://resend.com/docs)
- Resend Support: [https://resend.com/support](https://resend.com/support)


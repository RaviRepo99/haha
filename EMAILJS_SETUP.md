# EmailJS Template Setup Guide

## Your Template ID: template_l9ak8cj

### Required Template Variables:
Make sure your EmailJS email template includes these variables:

**To:** {{user_email}}
**Subject:** Welcome to CCRC IT Club! 🎉

**Email Body:**
```
Dear Subscriber,

Welcome to the CCRC IT Club community! 🎉

Thank you for subscribing to our updates. You'll now receive notifications about:
• Upcoming events and workshops
• Tech news and announcements
• Club activities and opportunities

Club Details:
• Club: {{club_name}}
• Subscription Date: {{subscription_date}}
• Website: {{website_url}}

Stay connected with us on social media and don't miss out on exciting tech events!

Best regards,
CCRC IT Club Team
```

### EmailJS Template Configuration:
1. Go to https://www.emailjs.com/
2. Select your service (Gmail)
3. Go to Email Templates
4. Edit template_l9ak8cj
5. Make sure the "To Email" field contains: {{user_email}}
6. Add the above content to your template
7. Save the template

### Testing:
1. Open your website at http://localhost:5177
2. Go to the footer subscribe section
3. Enter your email
4. Click "Test Email" button
5. Check browser console for logs
6. Check your email (including spam folder)

### Troubleshooting:
- Check browser console for errors
- Verify all environment variables are set
- Make sure EmailJS service is connected to your Gmail
- Check if emails are going to spam folder
- Verify template variables match exactly
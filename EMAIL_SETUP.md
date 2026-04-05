# Email Setup Guide - Contact Form

The contact form now uses **EmailJS** to send emails directly from the frontend without needing a backend server.

## Quick Setup (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Sign up for free (no credit card required)
3. You'll get instant access to the dashboard

### Step 2: Connect Your Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail** as the service
4. Click **Connect** (you'll authorize EmailJS to use your Gmail)
5. Choose the Gmail account: `alamparvej2024@gmail.com`
6. Copy the **Service ID** (example: `service_abc123xyz`)

### Step 3: Create Email Template
1. Go to **Email Templates** in dashboard
2. Click **Create New Template**
3. Use this template:

```
Name: Contact Form Template
ID: contact_form_template

Subject: New Contact Inquiry from {{from_name}}

Content:
---
Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
---

From email: {{from_email}}
Reply-To: {{reply_to}}
```

4. Save and copy the **Template ID**

### Step 4: Get Your Public Key
1. Go to **Account** in dashboard
2. Find your **Public Key** in the API section
3. Copy it (example: `abc123xyz_public`)

### Step 5: Update the Component
Open `src/components/public/ContactSection.vue` and replace these values in the `onMounted()` function and `submitForm()`:

```javascript
// Line 13 - Replace YOUR_PUBLIC_KEY_HERE
emailjs.init('YOUR_PUBLIC_KEY_HERE')

// Line 31 - Replace YOUR_SERVICE_ID_HERE
'YOUR_SERVICE_ID_HERE',

// Line 32 - Replace YOUR_TEMPLATE_ID_HERE
'YOUR_TEMPLATE_ID_HERE',
```

### Step 6: Test It!
1. Run `npm run dev`
2. Go to the contact form on your website
3. Fill it out and send
4. Check your Gmail inbox for the message

## Troubleshooting

**"Failed to send message"**
- Check that all three IDs are correctly copied
- Make sure EmailJS is authorized with your Gmail
- Check browser console (F12 → Console) for error messages

**"Not receiving emails"**
- Verify the email in ContactSection.vue is correct: `alamparvej2024@gmail.com`
- Check Gmail spam/promotions folder
- Verify template is saved in EmailJS dashboard

**Support**
- EmailJS docs: https://www.emailjs.com/docs/
- Contact EmailJS support: support@emailjs.com

---

**Note:** Your Gmail password is never exposed. EmailJS handles all authentication securely on their servers.

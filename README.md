# TheQuiltHub Share Service

This is a Next.js application that handles Facebook-shareable profile pages for TheQuiltHub directory.

## 🎯 What This Does

- Creates shareable URLs for business profiles: `share.thequilthub.com/share/bwulffandco`
- Facebook reads proper Open Graph tags (title, description, image)
- Users see a nice preview page then get redirected to TheQuiltHub
- Completely FREE to host on Vercel

## 📋 Prerequisites

You'll need:
1. A GitHub account (free) - [Sign up here](https://github.com/signup)
2. A Vercel account (free) - [Sign up here](https://vercel.com/signup)
3. Access to your domain's DNS settings (to add subdomain)

## 🚀 Step-by-Step Deployment

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** in top right → **"New repository"**
3. Name it: `thequilthub-share`
4. Make it **Public** or **Private** (your choice)
5. Click **"Create repository"**

### Step 2: Upload Your Code to GitHub

**Option A: Using GitHub Web Interface (Easiest)**

1. On your new repository page, click **"uploading an existing file"**
2. Drag and drop ALL the files from this folder:
   - `package.json`
   - `next.config.js`
   - `.gitignore`
   - `app/` folder (with all its contents)
3. Add commit message: "Initial commit"
4. Click **"Commit changes"**

**Option B: Using Git Command Line (If you know Git)**

```bash
cd thequilthub-share
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/thequilthub-share.git
git push -u origin main
```

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** next to your `thequilthub-share` repository
4. Leave all settings as default
5. Click **"Deploy"**
6. Wait 2-3 minutes for deployment to complete ✅

You'll get a URL like: `thequilthub-share.vercel.app`

### Step 4: Test It Works

Visit: `https://thequilthub-share.vercel.app/share/bwulffandco`

You should see:
- A redirect page with business info
- After 2 seconds, redirects to TheQuiltHub

Test on Facebook:
1. Go to: https://developers.facebook.com/tools/debug/
2. Paste: `https://thequilthub-share.vercel.app/share/bwulffandco`
3. Click **"Debug"**
4. You should see your business name, bio, and photo! ✅

### Step 5: Add Custom Subdomain (Optional but Recommended)

**A. In Vercel:**

1. Go to your project in Vercel
2. Click **"Settings"** → **"Domains"**
3. Add domain: `share.thequilthub.com`
4. Vercel will give you DNS instructions (CNAME record)

**B. In Your Domain Provider (e.g., GoDaddy, Namecheap, etc.):**

1. Log in to where you manage `thequilthub.com`
2. Go to **DNS Settings**
3. Add a **CNAME record**:
   - **Name/Host:** `share`
   - **Value/Points to:** `cname.vercel-dns.com`
   - **TTL:** Automatic or 3600
4. Save

**C. Wait & Verify:**

1. Wait 5-60 minutes for DNS to propagate
2. Vercel will auto-verify and add SSL certificate
3. Test: `https://share.thequilthub.com/share/bwulffandco` ✅

### Step 6: Update Your Shopify Pages

Now update your business profile and directory pages to use the new share URL!

**In your business profile page share buttons, change:**

```javascript
// OLD (Apps Script)
shareScriptUrl: "https://script.google.com/macros/s/..."

// NEW (Vercel)
shareScriptUrl: "https://share.thequilthub.com"
```

The share URLs will be:
```
https://share.thequilthub.com/share/bwulffandco
https://share.thequilthub.com/share/the-quilt-doc
```

## 📊 How the URL Works

**Format:** `https://share.thequilthub.com/share/[slug]`

**Slug generation (same as before):**
- Business name: "BWulffandCo" → slug: "bwulffandco"
- Business name: "The Quilt Doc" → slug: "the-quilt-doc"
- Business name: "Long Island Modern Quilt Guild" → slug: "long-island-modern-quilt-guild"

## 🔄 Making Updates

**To update the code:**

1. Edit files locally
2. Push to GitHub (or upload via GitHub web)
3. Vercel automatically redeploys (takes 1-2 minutes)
4. That's it!

## 💰 Cost

**Vercel Free Tier includes:**
- ✅ 100GB bandwidth per month
- ✅ Unlimited deployments
- ✅ Free SSL certificate
- ✅ Global CDN

**Your traffic won't exceed this** - you're well within the free tier! 🎉

## 🆘 Troubleshooting

### "Business Not Found" error
- Check that the business name in Google Sheets matches exactly
- Check slug generation (lowercase, spaces → hyphens, only alphanumeric)

### Facebook not showing preview
- Wait 5 minutes after deployment
- Clear Facebook cache using Sharing Debugger
- Check that photo URL is publicly accessible

### Subdomain not working
- DNS can take up to 24 hours (usually 5-60 minutes)
- Check CNAME record is correct in your DNS provider
- Make sure it points to `cname.vercel-dns.com`

### Changes not appearing
- Push changes to GitHub
- Vercel auto-deploys in 1-2 minutes
- Clear your browser cache

## 📞 Support

If you have issues:
1. Check Vercel deployment logs (in Vercel dashboard)
2. Test the URL directly in browser
3. Use Facebook Sharing Debugger to see what Facebook sees

## 🎉 You're Done!

Your share service is now:
- ✅ Live on Vercel (FREE)
- ✅ Has proper Open Graph tags
- ✅ Works perfectly with Facebook
- ✅ Redirects users to TheQuiltHub
- ✅ Looks professional and branded

Enjoy! 🧵

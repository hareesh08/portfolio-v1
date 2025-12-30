# Quick Start: Cloudflare Pages Deployment

## 3-Minute Setup

### Step 1: Go to Cloudflare Pages
```
https://dash.cloudflare.com/
```
Click **Pages** → **Create project**

### Step 2: Connect GitHub
1. Click **Connect to Git**
2. Authorize Cloudflare
3. Select: `hareesh08/portfolio-v1`

### Step 3: Configure
Build settings should auto-detect:
- **Branch:** main
- **Build command:** npm run build
- **Output directory:** dist

Click **Save and Deploy**

---

## Done! Your site is live at:
```
https://portfolio-v1.pages.dev/
```

---

## Future Updates
Every push to GitHub automatically deploys:
```bash
git add .
git commit -m "Update: your changes"
git push origin main
```

Your site updates within **1-3 minutes**!

---

## Optional: Add Custom Domain
1. In Cloudflare Pages → Settings → Domains
2. Add your domain
3. Update DNS records
4. Site goes live at your custom domain

---

See `CLOUDFLARE_PAGES_SETUP.md` for detailed instructions and troubleshooting.

# Cloudflare Pages Deployment Guide

Your portfolio is ready to deploy on **Cloudflare Pages** - a fast, secure, and free hosting solution.

---

## Why Cloudflare Pages?

✅ **Free** - No cost for unlimited deployments  
✅ **Fast** - Global CDN with 200+ data centers  
✅ **Secure** - Free HTTPS, DDoS protection, security headers  
✅ **Easy** - Git integration, automatic builds  
✅ **Reliable** - 99.95% uptime SLA  
✅ **Preview Deployments** - Test before going live  

---

## Setup Steps

### Step 1: Create Cloudflare Account
1. Go to https://dash.cloudflare.com/sign-up
2. Sign up with email or GitHub (recommended)
3. Verify email

### Step 2: Add Your Domain to Cloudflare
1. Go to https://dash.cloudflare.com
2. Click **Add a domain**
3. Enter your domain (e.g., `portfolio.com`)
4. Select **Free** plan
5. Update nameservers at your domain registrar:
   ```
   ns1.cloudflare.com
   ns2.cloudflare.com
   ```
   (Takes 5-48 hours to propagate)

OR skip domain for now and use free `*.pages.dev` subdomain

### Step 3: Connect GitHub Repository
1. Go to https://dash.cloudflare.com/
2. Select **Pages** in the left sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Authorize Cloudflare to access GitHub
6. Select repository: `hareesh08/portfolio-v1`
7. Click **Begin setup**

### Step 4: Configure Build Settings
The build settings should auto-detect:

```
Production branch: main
Build command: npm run build
Build output directory: dist
```

If not auto-detected, set them manually:

**Framework preset:** None (custom)

**Build command:**
```bash
npm run build
```

**Build output directory:**
```
dist
```

**Root directory (advanced):** `/`

**Node.js version:** 18.x

### Step 5: Environment Variables (Optional)
Add any environment variables needed:

1. After creating project, go to **Settings → Environment variables**
2. Add variables (e.g., API keys, if needed)
3. Click **Save**

For this portfolio, no variables are required.

### Step 6: Deploy
1. Click **Save and Deploy**
2. Cloudflare will:
   - Clone your repository
   - Run `npm run build`
   - Deploy to their global CDN
   - Give you a live URL

### Step 7: Custom Domain (Optional)
To use your own domain:

1. Go to your **Pages project → Settings → Domains**
2. Click **Add a custom domain**
3. Enter your domain (e.g., `portfolio.example.com`)
4. Add the DNS record or CNAME record shown by Cloudflare
5. Wait for DNS propagation (usually instant with Cloudflare)

---

## Your Live URLs

After deployment:

### Default Cloudflare URL (Free)
```
https://portfolio-v1.pages.dev/
```

### Custom Domain (Optional)
```
https://portfolio.example.com/
```

### GitHub Repository
```
https://github.com/hareesh08/portfolio-v1
```

---

## Automatic Deployments

Once connected, every push to `main` automatically:
1. ✅ Triggers a build
2. ✅ Runs tests (if configured)
3. ✅ Deploys to live site
4. ✅ Creates preview for pull requests

### Push Updates
```bash
git add .
git commit -m "Update: new changes"
git push origin main
```

Your site updates live within **1-3 minutes**!

---

## Preview Deployments

Every pull request automatically gets a preview URL:

1. Create a feature branch
2. Make changes
3. Push and create pull request on GitHub
4. Cloudflare creates preview deployment
5. Share `https://pr-123.portfolio-v1.pages.dev/` with team
6. Merge PR to deploy to production

---

## Security Features (Enabled by Default)

Your site has security headers configured in `public/_headers`:

- ✅ X-Frame-Options - Prevents clickjacking
- ✅ X-Content-Type-Options - Prevents MIME sniffing
- ✅ X-XSS-Protection - Enables browser XSS filters
- ✅ Content-Security-Policy - Restricts resource loading
- ✅ Referrer-Policy - Controls referrer information
- ✅ Permissions-Policy - Restricts browser features

---

## Performance Optimization

Cloudflare automatically handles:

- **Minification** - Minifies HTML, CSS, JavaScript
- **Image Optimization** - Optimizes images automatically
- **Caching** - Caches static assets globally
- **Compression** - Gzip/Brotli compression
- **HTTP/3** - Latest protocol for faster connections

### Cache Control Rules
Already configured in `public/_headers`:

```
Static assets (JS, CSS, images):   Cache for 1 year
HTML files:                         Cache for 1 hour
```

---

## Analytics & Monitoring

### View Analytics
1. Go to your Pages project
2. Click **Analytics**
3. See:
   - Page views
   - Requests
   - Response times
   - Countries
   - Bot traffic

### Check Deployment Status
1. Go to your Pages project
2. Click **Deployments**
3. See deployment history and status

### Uptime Monitoring
1. Set up with Cloudflare's **Page Rule**
2. Or use external service like UptimeRobot
3. Monitor at https://www.uptimerobot.com/

---

## Advanced Features

### 1. Custom Build Configuration
Create `wrangler.toml` for advanced options:
```toml
name = "portfolio-v1"
account_id = "YOUR_ACCOUNT_ID"

[build]
command = "npm run build"
cwd = "./"
```

### 2. Environment-Specific Builds
Create `.env.production`:
```
VITE_API_URL=https://api.example.com
```

### 3. Scheduled Deployments
Use GitHub Actions to trigger rebuilds on schedule:
```yaml
on:
  schedule:
    - cron: "0 0 * * *"  # Daily at midnight
```

### 4. Redirect Rules
Add to `public/_redirects`:
```
/old-page    /new-page    301
/api/*       https://api.example.com/:splat  200
```

---

## Rollback to Previous Deployment

If something goes wrong:

1. Go to **Deployments** in your Pages project
2. Find the previous working deployment
3. Click the **three dots** menu
4. Select **Rollback to this deployment**

Or simply:
```bash
git revert HEAD
git push origin main
```

---

## Domain Setup Instructions

### If using Cloudflare DNS:
1. Cloudflare manages your domain's DNS
2. Add CNAME record:
   - Name: `portfolio` (or subdomain)
   - Type: CNAME
   - Value: `portfolio-v1.pages.dev`
3. Cloudflare usually auto-detects and creates it

### If using external DNS registrar:
1. Don't use Cloudflare's nameservers
2. Go to your registrar's DNS settings
3. Add CNAME record:
   ```
   Name: portfolio
   Value: portfolio-v1.pages.dev
   ```
4. Wait for DNS propagation (5 minutes to 48 hours)

---

## Troubleshooting

### Build Fails
**Error in logs:** Check Actions tab at GitHub

**Solution:**
```bash
# Verify build locally
npm install
npm run build

# Check for errors
npm run lint
```

### Site shows blank page
**Cause:** Routing issue

**Solution:**
- Verify `public/_redirects` file exists
- Check `src/App.tsx` uses `BrowserRouter`
- Check `vite.config.ts` has `base: "/"`

### Assets not loading
**Cause:** Cache issue

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R)
2. Clear browser cache
3. Go to Pages → Deployment → View Build Log

### Custom domain not working
**Cause:** DNS not propagated

**Solution:**
1. Use https://www.whatsmydns.net to check propagation
2. Wait 5 minutes to 48 hours
3. Verify CNAME record is correct

### Still not working?
- Check Cloudflare Status Page: https://www.cloudflarestatus.com/
- Review build logs in dashboard
- Check GitHub Actions for errors

---

## Best Practices

1. **Always test locally first:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Use meaningful commit messages:**
   ```
   git commit -m "feat: Add new section"
   ```

3. **Create feature branches for testing:**
   ```bash
   git checkout -b feature/new-design
   git push origin feature/new-design
   # Create PR, get preview URL
   ```

4. **Monitor deployments:**
   - Check Analytics regularly
   - Set up alerts for failures
   - Review security headers

5. **Keep dependencies updated:**
   ```bash
   npm update
   git push origin main
   ```

---

## Next Steps

✅ **Now Live:** Your portfolio is deployed on Cloudflare Pages!

**What to do next:**
1. Test your live site
2. Share your portfolio URL
3. Monitor analytics
4. Continue building and updating
5. Consider upgrading domain (optional)

---

## Support

- **Cloudflare Docs:** https://developers.cloudflare.com/pages/
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Common Issues:** https://developers.cloudflare.com/pages/troubleshooting/
- **Community Forum:** https://community.cloudflare.com/

---

**Your portfolio is now live and automatically deployed!** 🎉

Every push to GitHub automatically updates your live site.

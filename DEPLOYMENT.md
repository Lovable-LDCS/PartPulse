# GitHub Pages Deployment Guide

## Automatic Deployment (Recommended)

PartPulse is configured for automatic deployment to GitHub Pages whenever you push to the `main` branch.

### Setup Steps

1. **Enable GitHub Pages in Repository Settings**
   - Go to your repository on GitHub
   - Click Settings → Pages
   - Under "Build and deployment":
     - Source: Select "GitHub Actions"
   - Save changes

2. **Verify Workflow Permissions**
   - Go to Settings → Actions → General
   - Under "Workflow permissions":
     - Select "Read and write permissions"
     - Check "Allow GitHub Actions to create and approve pull requests"
   - Save

3. **Push to Main Branch**
   ```bash
   git push origin main
   ```

4. **Monitor Deployment**
   - Go to the "Actions" tab in your repository
   - Watch the "Deploy to GitHub Pages" workflow
   - Once complete (green checkmark), your site is live!

5. **Access Your App**
   - Your app will be available at:
     ```
     https://lovable-ldcs.github.io/PartPulse-1/
     ```

### Workflow Details

The deployment workflow (`.github/workflows/deploy.yml`):
- Runs on every push to `main`
- Installs dependencies
- Builds the Next.js app
- Deploys to GitHub Pages
- Typically completes in 2-3 minutes

### Troubleshooting

#### 404 Errors After Deployment
- Ensure `.nojekyll` file exists in the build output
- Check that `basePath` in `next.config.js` matches your repository name
- Verify GitHub Pages is enabled and using "GitHub Actions" as source

#### Build Failures
- Check the Actions tab for error logs
- Common issues:
  - Missing dependencies (run `npm install` locally first)
  - TypeScript errors (run `npm run typecheck` locally)
  - Linting errors (run `npm run lint` locally)

#### Workflow Not Running
- Ensure you pushed to the `main` branch
- Check Settings → Actions → General → "Actions permissions" is enabled
- Verify the workflow file exists: `.github/workflows/deploy.yml`

## Manual Deployment

If you prefer manual deployment or need to deploy to a different platform:

### Build Locally
```bash
npm install
npm run build
```

The static site will be in the `out/` directory.

### Deploy to Other Platforms

#### Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Run: `vercel`
3. Follow prompts

#### Netlify
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run: `netlify deploy`
3. For production: `netlify deploy --prod`

#### Custom Server
1. Build the site: `npm run build`
2. Copy the `out/` directory to your web server
3. Configure your server to serve static files
4. Ensure proper routing for SPA (redirect all routes to index.html)

## Environment Variables

For production deployment with full functionality, set these environment variables:

### Supabase (Database)
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Email (Resend)
```
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
```

**Note**: For GitHub Pages static deployment, these should be set as repository secrets if needed by build-time operations. However, since this is a static export, dynamic features requiring these credentials will need an API backend.

## Custom Domain

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public/` directory:
   ```
   partpulse.yourdomain.com
   ```

2. Configure DNS:
   - Add a CNAME record pointing to: `lovable-ldcs.github.io`

3. Enable custom domain in GitHub Pages settings

4. Wait for DNS propagation (can take up to 24 hours)

5. Enable "Enforce HTTPS" in GitHub Pages settings

## Monitoring Deployment

After deployment, verify:
- ✅ All pages load correctly
- ✅ Logo displays properly
- ✅ Navigation works
- ✅ Forms are functional
- ✅ Role switching works
- ✅ Preview mode toggle works

## Rollback

If you need to rollback to a previous version:

1. Find the commit hash of the working version:
   ```bash
   git log
   ```

2. Revert to that commit:
   ```bash
   git revert <commit-hash>
   git push origin main
   ```

The workflow will automatically redeploy the previous version.

## Support

For deployment issues:
- Check the GitHub Actions logs
- Review this deployment guide
- Contact: joline.kruger@tranetechnologies.com or johan.ras2@outlook.com

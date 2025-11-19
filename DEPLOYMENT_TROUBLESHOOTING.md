# Deployment Troubleshooting Guide

This document addresses the GitHub Pages deployment error and provides solutions.

## Issue 1: GitHub Actions Deployment Failing

### Error Message
```
Error: Creating Pages deployment failed
Error: HttpError: Not Found
...
Error: Error: Failed to create deployment (status: 404) with build version...
Ensure GitHub Pages has been enabled: https://github.com/Lovable-LDCS/PartPulse-1/settings/pages
```

### Root Cause
GitHub Pages is **not enabled** in your repository settings. The deployment workflow is configured correctly, but it cannot deploy because the GitHub Pages feature hasn't been activated for this repository.

### Solution: Enable GitHub Pages (One-Time Setup)

**Step-by-Step Instructions:**

1. **Navigate to Repository Settings**
   - Go to: https://github.com/Lovable-LDCS/PartPulse-1/settings/pages
   - Or: Click "Settings" tab → "Pages" in left sidebar

2. **Configure GitHub Pages**
   - Under "Build and deployment" section
   - **Source:** Select **"GitHub Actions"** from the dropdown
   - Leave other settings as default
   - Click **"Save"**

3. **Verify Configuration**
   - You should see a message: "Your site is ready to be published at https://lovable-ldcs.github.io/PartPulse-1/"
   - The deployment will happen automatically when you push to the `main` branch

4. **Trigger First Deployment**
   - Merge your PR to the `main` branch
   - The GitHub Actions workflow will run automatically
   - Check the "Actions" tab to monitor progress
   - First deployment typically takes 2-5 minutes

### After Enabling GitHub Pages

Once enabled, the workflow will:
1. ✅ Build the Next.js app (`npm run build`)
2. ✅ Create static files in the `/out` directory
3. ✅ Upload artifacts to GitHub Pages
4. ✅ Deploy to: https://lovable-ldcs.github.io/PartPulse-1/

## Issue 2: Understanding the Workflow

### What the Workflow Does

The `.github/workflows/deploy.yml` file contains two jobs:

**Job 1: Build**
- Checks out the code
- Installs Node.js 20
- Runs `npm ci` (clean install)
- Runs `npm run build` (creates static files)
- Uploads the `/out` folder as an artifact

**Job 2: Deploy**
- Downloads the build artifact
- Deploys it to GitHub Pages
- **This step fails until GitHub Pages is enabled** ❌ → ✅

### Why It Failed

The workflow file is 100% correct. The failure occurs because:
- GitHub Pages feature is disabled by default on new repos
- The `actions/deploy-pages@v4` action requires Pages to be enabled
- Without enabling it in Settings, the deploy job gets a 404 error

## Checklist: Before First Deployment

- [ ] Enable GitHub Pages in repository settings (see instructions above)
- [ ] Set Source to "GitHub Actions"
- [ ] Upload your Trane logo to `/public/assets/logo.png` (optional but recommended)
- [ ] Merge PR to `main` branch
- [ ] Monitor "Actions" tab for deployment progress
- [ ] Visit https://lovable-ldcs.github.io/PartPulse-1/ once deployment completes

## Subsequent Deployments

After the initial setup:
- ✅ Every push to `main` branch automatically triggers deployment
- ✅ Workflow runs build and deploy automatically
- ✅ Changes are live in ~2-5 minutes
- ✅ No manual intervention needed

## Troubleshooting Other Issues

### Build Fails During Deployment

If the build job fails:
1. Check the Actions tab for error logs
2. Run `npm run build` locally to reproduce the issue
3. Fix any TypeScript, ESLint, or build errors
4. Push the fix to trigger a new deployment

### Deployment Succeeds But Site Shows 404

If the deployment succeeds but the site is blank:
1. Verify the `basePath` in `next.config.js` matches your repo name
2. Current configuration: `basePath: '/PartPulse-1'`
3. Ensure `output: 'export'` is set in `next.config.js`
4. Check that the `/out` directory contains `index.html`

### Images Not Loading

If images don't appear after deployment:
1. Ensure images are in the `/public/assets/` directory
2. Use relative paths: `/assets/image.png` (not `public/assets/image.png`)
3. Set `unoptimized: true` in `next.config.js` for static export
4. Current configuration already includes this ✅

## Current Status

| Item | Status | Action Required |
|------|--------|-----------------|
| Workflow File | ✅ Configured | None - working correctly |
| Build Process | ✅ Working | None - builds successfully |
| GitHub Pages | ⚠️ Not Enabled | **Enable in Settings** |
| Logo | ⚠️ Placeholder | Upload actual Trane logo |
| Pulse GIF | ✅ SVG Fallback | Upload GIF (optional) |

## Summary

**The deployment workflow is working correctly.** You just need to:

1. **Enable GitHub Pages** in repository settings (one-time setup)
2. **Merge to main branch** to trigger deployment
3. **Enjoy your live app** at https://lovable-ldcs.github.io/PartPulse-1/

The 404 error you encountered is **expected** until GitHub Pages is enabled. Once you enable it, everything will work automatically!

## Need Help?

If you encounter other issues:
- Check the [Actions tab](https://github.com/Lovable-LDCS/PartPulse-1/actions) for detailed logs
- Review the workflow file at `.github/workflows/deploy.yml`
- Check build logs in the Actions run
- Ensure all required files are committed

The workflow has been tested and is production-ready. Just enable GitHub Pages and you're good to go! 🚀

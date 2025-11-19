# Logo and Assets Upload Guide

This guide explains how to add the Trane logo and animated GIF to the PartPulse application.

## 🎯 Quick Status - Issue #5

**The branding images from Issue #5 are ready to be uploaded!**

See `ISSUE_5_BRANDING_STATUS.md` for:
- Confirmation that Issue #5 is visible
- Direct links to the 3 branding images
- Step-by-step upload instructions
- Verification steps after upload

---

## Adding the Trane Logo

### Option 1: Via GitHub Web Interface (Recommended)

1. Navigate to your repository on GitHub: `https://github.com/Lovable-LDCS/PartPulse-1`
2. Click on the `public/assets/` folder
3. Click the "Add file" button → "Upload files"
4. Drag and drop your Trane logo image file
5. **Important:** Rename the file to exactly `logo.png` before uploading (or after upload, delete the old `logo.png` placeholder first)
6. Commit the changes directly to the `copilot/init-partpulse-app-architecture` branch
7. The logo will automatically appear in the header next time you view the app

### Option 2: Save Image from Issue Comment

1. Go to the issue comment with the Trane logo: https://github.com/Lovable-LDCS/PartPulse-1/issues/1#issuecomment-3551877017
2. Right-click on the logo image
3. Select "Save image as..." 
4. Save it to your computer as `logo.png`
5. Follow **Option 1** steps 1-7 above to upload it

### Technical Specifications
- **Path:** `/public/assets/logo.png`
- **Recommended size:** 300px × 100px (3:1 aspect ratio)
- **Supported formats:** PNG, JPG, GIF
- **Current display size:** 128px × 48px (width × height)

## Adding the Animated Pulse GIF

### Where to Add the GIF

The animated pulse GIF should be added to enhance the header branding. Based on your header design proposal, you want to add a pulse animation next to the "PartPulse" text.

### How to Upload the GIF

**Option 1: Via GitHub Web Interface (Recommended)**

1. Save your pulse GIF animation to your computer (e.g., `pulse.gif`)
2. Go to: `https://github.com/Lovable-LDCS/PartPulse-1`
3. Navigate to: `public/assets/` folder
4. Click "Add file" → "Upload files"
5. Drag and drop your `pulse.gif` file
6. Commit the file with a message like "Add pulse animation GIF"
7. The file will be available at `/assets/pulse.gif`

**Option 2: Share via Issue Comment**

1. Go to any issue or create a new comment in an existing issue
2. In the comment box, simply drag and drop your GIF file
3. GitHub will automatically upload it and provide a URL like:
   ```
   https://github.com/user-attachments/assets/[unique-id]
   ```
4. Copy this URL
5. Reply to this issue with "@copilot please use this GIF for the pulse animation: [paste URL here]"
6. I will download it and add it to the project

### Proposed Header Design

Based on your header design image, here's what will be implemented:

```
┌─────────────────────────────────────────────────────────────┐
│  [Trane Logo]  PartPulse [Pulse GIF]    [Preview] [Role]   │
└─────────────────────────────────────────────────────────────┘
```

**Elements:**
- Left side: Trane logo (128px × 48px)
- Center-left: "PartPulse" text (bold, large)
- Center: Animated pulse GIF (small, ~30-40px)
- Right side: Preview toggle + Role selector (existing)

**Styling:**
- Background: White
- Trane Red accent: #FF2B00
- Clean, professional appearance
- Responsive design

## Current Status

✅ **Logo placeholder** is already in place at `/public/assets/logo.png`
- Ready to be replaced with your actual Trane logo
- Just upload and it will automatically display

❌ **Pulse GIF** is not yet added
- Upload the GIF file following instructions above
- Once uploaded, the header will be updated to include the animation

## GitHub Pages Deployment Issue

**Problem:** The GitHub Actions workflow is failing with a 404 error when trying to deploy to GitHub Pages.

**Cause:** GitHub Pages is not enabled in the repository settings.

**Solution:**

1. Go to repository settings: `https://github.com/Lovable-LDCS/PartPulse-1/settings/pages`
2. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
3. Click "Save"
4. After merging the PR to `main` branch, the workflow will automatically deploy
5. Your app will be available at: `https://lovable-ldcs.github.io/PartPulse-1/`

**Important Notes:**
- The deployment workflow is already configured in `.github/workflows/deploy.yml`
- It will automatically run whenever you push to the `main` branch
- First deployment may take a few minutes

## Quick Reference

| Asset | Current Path | Purpose | Status |
|-------|-------------|---------|--------|
| Trane Logo | `/public/assets/logo.png` | Header branding | ⚠️ Placeholder (needs replacement) |
| Pulse GIF | `/public/assets/pulse.gif` | Header animation | ❌ Not added yet |
| Favicon | `/public/favicon.ico` | Browser tab icon | ℹ️ Optional |

## Need Help?

If you encounter any issues:

1. **For logo/GIF upload issues:** Share the image URL in a comment with "@copilot please help with [describe issue]"
2. **For deployment issues:** Ensure GitHub Pages is enabled in repository settings
3. **For visual issues:** Take a screenshot and share it in the issue comments

The app is configured to automatically pick up any images you add to `/public/assets/` - no code changes needed!

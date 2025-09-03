# Deployment Guide - GitHub Pages

This guide will help you deploy the Interactive Computer Networking Presentation to GitHub Pages using GitHub Actions.

## Prerequisites

- GitHub account
- Git installed on your local machine
- Node.js 20+ installed

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `computer-networking` (or any name you prefer)
5. Make sure it's set to **Public** (required for free GitHub Pages)
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Update Package.json

Before pushing, update the homepage URL in `package.json`:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/REPOSITORY_NAME"
}
```

Replace:

- `YOUR_USERNAME` with your GitHub username
- `REPOSITORY_NAME` with your repository name

## Step 3: Initialize Git and Push to GitHub

Run these commands in your project directory:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Interactive Computer Networking Presentation"

# Add your GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/REPOSITORY_NAME.git

# Push to GitHub
git push -u origin main
```

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

## Step 5: Deploy

The GitHub Actions workflow will automatically:

1. **Trigger** on every push to main branch
2. **Build** the project using Node.js 20
3. **Deploy** to GitHub Pages

### Manual Deployment

To trigger deployment manually:

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Click **Deploy to GitHub Pages** workflow
4. Click **Run workflow** button
5. Select the branch (usually `main`)
6. Click **Run workflow**

## Step 6: Access Your Site

Once deployment is complete, your site will be available at:

```
https://YOUR_USERNAME.github.io/REPOSITORY_NAME
```

## Troubleshooting

### Build Fails

- Check the **Actions** tab for error details
- Ensure all dependencies are properly listed in `package.json`
- Verify Node.js version compatibility

### Pages Not Loading

- Wait 5-10 minutes after deployment
- Check if GitHub Pages is enabled in repository settings
- Verify the repository is public

### 404 Error

- Ensure the homepage URL in `package.json` matches your repository
- Check that the build output directory is correct (`build/`)

### Blank Page / Assets Not Loading

If your page loads but shows a blank screen with console errors like:
```
GET https://username.github.io/assets/index-xxx.js net::ERR_ABORTED 404
```

This is a base path issue. Run the fix script:
```bash
./fix-github-pages.sh
```

Or manually fix by updating `vite.config.ts`:
```typescript
base: process.env.NODE_ENV === 'production' ? '/REPOSITORY_NAME/' : '/'
```

## Custom Domain (Optional)

To use a custom domain:

1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Add the domain in GitHub Pages settings

## Environment Variables

If you need environment variables:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add your secrets as repository secrets
3. Use them in the workflow with `${{ secrets.SECRET_NAME }}`

## Workflow Features

The deployment workflow includes:

- ✅ **Node.js 20** support
- ✅ **Automatic builds** on push
- ✅ **GitHub Pages** deployment
- ✅ **Build caching** for faster deployments
- ✅ **Concurrent deployment** protection
- ✅ **Artifact upload** and deployment

## Support

If you encounter issues:

1. Check the GitHub Actions logs
2. Verify repository settings
3. Ensure all files are committed and pushed
4. Check GitHub Pages status page for outages

---

**Note**: The first deployment may take 5-10 minutes. Subsequent deployments are usually faster due to caching.

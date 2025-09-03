#!/bin/bash

# Fix GitHub Pages deployment issues
# This script fixes the base path configuration for GitHub Pages

echo "🔧 Fixing GitHub Pages deployment configuration..."
echo ""

# Get repository information
echo "📝 Please provide your GitHub repository information:"
echo ""
read -p "GitHub Username: " GITHUB_USERNAME
read -p "Repository Name: " REPO_NAME

if [ -z "$GITHUB_USERNAME" ] || [ -z "$REPO_NAME" ]; then
    echo "❌ Both username and repository name are required."
    exit 1
fi

echo ""
echo "🔧 Updating configuration files..."

# Update package.json
if command -v sed &> /dev/null; then
    sed -i.bak "s|\"homepage\": \".*\"|\"homepage\": \"https://${GITHUB_USERNAME}.github.io/${REPO_NAME}\"|g" package.json
    rm package.json.bak 2>/dev/null || true
    echo "✅ Updated package.json homepage"
    
    # Update vite.config.ts base path
    sed -i.bak "s|base: process.env.NODE_ENV === 'production' ? '.*' : '/'|base: process.env.NODE_ENV === 'production' ? '/${REPO_NAME}/' : '/'|g" vite.config.ts
    rm vite.config.ts.bak 2>/dev/null || true
    echo "✅ Updated vite.config.ts base path"
else
    echo "⚠️  Please manually update:"
    echo "   package.json homepage: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
    echo "   vite.config.ts base: /${REPO_NAME}/"
fi

echo ""
echo "🔧 Testing build with correct configuration..."

# Test build
if command -v npm &> /dev/null; then
    NODE_ENV=production npm run build
    if [ $? -eq 0 ]; then
        echo "✅ Build successful with correct base path"
    else
        echo "❌ Build failed. Please check the error messages above."
        exit 1
    fi
else
    echo "⚠️  npm not found. Please run 'NODE_ENV=production npm run build' manually."
fi

echo ""
echo "🎉 Configuration fixed!"
echo ""
echo "📋 Next steps:"
echo "1. Commit and push your changes:"
echo "   git add ."
echo "   git commit -m 'Fix GitHub Pages base path configuration'"
echo "   git push"
echo ""
echo "2. The GitHub Actions workflow will automatically redeploy"
echo ""
echo "3. Your site should now work at:"
echo "   https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
echo ""
echo "💡 If you still have issues, check the GitHub Actions logs in your repository."

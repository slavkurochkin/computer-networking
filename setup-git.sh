#!/bin/bash

# Interactive Computer Networking - Git Setup Script
# This script helps you set up git and push to GitHub

echo "🚀 Setting up Git for Interactive Computer Networking Presentation"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in a git repository
if [ -d ".git" ]; then
    echo "⚠️  Git repository already exists."
    read -p "Do you want to continue? (y/n): " -n 1 -r
    echo
    if [[ ! $RE =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Get repository information
echo "📝 Please provide your GitHub repository information:"
echo ""
read -p "GitHub Username: " GITHUB_USERNAME
read -p "Repository Name (default: computer-networking): " REPO_NAME

# Set default repository name if empty
if [ -z "$REPO_NAME" ]; then
    REPO_NAME="computer-networking"
fi

echo ""
echo "🔧 Updating package.json with your repository URL..."

# Update package.json with the correct homepage
if command -v sed &> /dev/null; then
    sed -i.bak "s|https://YOUR_USERNAME.github.io/computer-networking|https://${GITHUB_USERNAME}.github.io/${REPO_NAME}|g" package.json
    rm package.json.bak 2>/dev/null || true
    echo "✅ Updated package.json"
else
    echo "⚠️  Please manually update package.json with: https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
fi

echo ""
echo "🔧 Setting up Git repository..."

# Initialize git if not already done
if [ ! -d ".git" ]; then
    git init
    echo "✅ Initialized Git repository"
fi

# Add all files
git add .
echo "✅ Added all files to Git"

# Create initial commit
git commit -m "Initial commit: Interactive Computer Networking Presentation"
echo "✅ Created initial commit"

# Add remote origin
GITHUB_URL="https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git"
git remote add origin "$GITHUB_URL" 2>/dev/null || git remote set-url origin "$GITHUB_URL"
echo "✅ Added remote origin: $GITHUB_URL"

echo ""
echo "🎉 Git setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Create the repository on GitHub: https://github.com/new"
echo "   - Repository name: $REPO_NAME"
echo "   - Make it PUBLIC (required for free GitHub Pages)"
echo "   - Don't initialize with README, .gitignore, or license"
echo ""
echo "2. Push to GitHub:"
echo "   git push -u origin main"
echo ""
echo "3. Enable GitHub Pages:"
echo "   - Go to repository Settings → Pages"
echo "   - Source: GitHub Actions"
echo ""
echo "4. Your site will be available at:"
echo "   https://${GITHUB_USERNAME}.github.io/${REPO_NAME}"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"

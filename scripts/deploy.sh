#!/bin/bash

# LanguageConnect Deploy Script
echo "🚀 Deploying LanguageConnect..."

# Check if we're in the right directory
if [ ! -f package.json ]; then
    echo "❌ package.json not found. Please run this script from the project root."
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found. Please create it from env.example"
    exit 1
fi

# Build the application
echo "🏗️  Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "🐳 Building Docker image..."
    docker build -t languageconnect .
    
    if [ $? -ne 0 ]; then
        echo "❌ Docker build failed"
        exit 1
    fi
    
    echo "✅ Docker image built successfully!"
    echo ""
    echo "To run the container:"
    echo "docker run -p 3000:3000 languageconnect"
else
    echo "⚠️  Docker not available. Skipping Docker build."
fi

echo "✅ Deployment preparation completed!"
echo ""
echo "The application is ready for deployment."
echo "You can now deploy to your preferred platform:"
echo "- Vercel: vercel --prod"
echo "- Netlify: netlify deploy --prod"
echo "- Docker: docker run -p 3000:3000 languageconnect"



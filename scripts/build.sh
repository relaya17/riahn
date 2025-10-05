#!/bin/bash

# LanguageConnect Build Script
echo "🔨 Building LanguageConnect..."

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ .env.local not found. Please create it from env.example"
    exit 1
fi

# Run type checking
echo "🔍 Running type checking..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "❌ Type checking failed"
    exit 1
fi

# Run linting
echo "🧹 Running linting..."
npm run lint

if [ $? -ne 0 ]; then
    echo "❌ Linting failed"
    exit 1
fi

# Build the application
echo "🏗️  Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""
echo "To start the production server:"
echo "npm start"



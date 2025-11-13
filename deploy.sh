#!/bin/bash

echo "🚀 Deploying Backend to Vercel..."
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "📦 Building project..."
npm run build

echo "🔐 Please make sure you have set these environment variables in Vercel:"
echo "   - MONGODB_URI"
echo "   - MONGODB_DB"
echo "   - FRONTEND_URL"
echo "   - JWT_SECRET"
echo ""

echo "🚀 Starting deployment..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo "📝 Don't forget to update frontend API URL in:"
echo "   graduation-invitation/src/config/api.ts"

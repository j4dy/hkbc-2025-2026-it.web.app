#!/usr/bin/env bash
set -e

echo "🚀 Deploying HKBC Vibe Coding Portfolio to Firebase Hosting..."

# Run build
./scripts/build.sh

# Deploy to Firebase Hosting
npx -y firebase-tools@latest deploy --only hosting

echo "🎉 Deployment finished! Visit https://hkbc-2025-2026-it.web.app"

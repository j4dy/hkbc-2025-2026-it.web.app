#!/usr/bin/env bash
set -e

echo "🔨 Building HKBC Vibe Coding Portfolio..."

# Clean dist directory
rm -rf dist
mkdir -p dist/src/data dist/games

# Copy root assets
cp index.html dist/index.html
cp style.css dist/style.css
cp app.js dist/app.js

# Copy games
if [ -d "public/games" ]; then
  cp -r public/games/* dist/games/
fi

# Copy data
cp src/data/projects.json dist/src/data/projects.json

echo "✅ Build completed successfully into dist/"
ls -la dist

#!/usr/bin/env bash
set -e

# Run build
./scripts/build.sh

echo "⚡ Starting local server at http://localhost:5000..."
npx -y firebase-tools@latest emulators:start --only hosting

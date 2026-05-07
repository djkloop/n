#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/opt/1panel/apps/cybertruckai-pages"

cd "$PROJECT_DIR"

git pull

export NEXT_PUBLIC_GIT_SHA="$(git rev-parse --short HEAD)"

docker compose up -d --build

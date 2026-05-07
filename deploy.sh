#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="/opt/1panel/apps/cybertruckai-pages"
RELEASE_TYPE="${1:-none}"

cd "$PROJECT_DIR"

git pull

if [[ "$RELEASE_TYPE" != "none" ]]; then
  case "$RELEASE_TYPE" in
    patch|minor|major)
      pnpm "bump:$RELEASE_TYPE"
      git add package.json package-lock.json pnpm-lock.yaml
      git commit -m "release: bump $RELEASE_TYPE version"
      git push
      ;;
    *)
      echo "Unsupported release type: $RELEASE_TYPE"
      echo "Usage: ./deploy.sh [patch|minor|major]"
      exit 1
      ;;
  esac
fi

export NEXT_PUBLIC_GIT_SHA="$(git rev-parse --short HEAD)"

docker compose up -d --build

#!/usr/bin/env bash
# Run a throwaway Home Assistant 2026.11.1 for card-pack verification.
# usage: dev/run-ha.sh <state-dir> <media-dir> [port]
set -euo pipefail
state=${1:?state dir}; media=${2:?media dir}; port=${3:-8123}
here=$(cd "$(dirname "$0")" && pwd)
mkdir -p "$state/www" "$media"
cp "$here/ha/configuration.yaml" "$state/configuration.yaml"
mkdir -p "$state/custom_components" && cp -R "$here/ha/custom_components/." "$state/custom_components/"
[ -f "$here/../dist/homeview.js" ] && cp "$here/../dist/homeview.js" "$state/www/homeview.js"
docker rm -f homeview-ha >/dev/null 2>&1 || true
docker run -d --name homeview-ha -p "$port:8123" \
  -v "$state:/config" -v "$media:/media" \
  -e TZ=UTC ghcr.io/home-assistant/home-assistant:2026.11.1

#!/bin/bash
#
# build-android.sh
# Script principal — lancé depuis la machine hôte
#
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
cd "$PROJECT_ROOT"

echo ""
echo "════════════════════════════════════════"
echo "   BUILD ANDROID — Docker local"
echo "════════════════════════════════════════"
echo ""

if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker n'est pas démarré. Lancez Docker Desktop puis réessayez."
  exit 1
fi
echo "✓ Docker est actif"

# Charger les variables d'environnement (pour docker-compose)
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
  echo "✓ Variables .env chargées"
fi

# Dossiers de sortie
mkdir -p generated/builds/apk
mkdir -p generated/source/android

echo ""
echo "▶ Lancement du build Docker..."
echo ""

docker compose -f docker/docker-compose.yml up \
  --build \
  --abort-on-container-exit \
  --exit-code-from android-builder

echo ""
echo "✅ Build terminé ! Votre APK est dans : generated/builds/apk/"


#!/bin/bash
set -e

SERVER="maxim@178.104.39.221"
REMOTE_PATH="/var/www/demo.behavora.com"
LOCAL_PATH="$(dirname "$0")/"

echo "Синхронизация файлов..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='.env*' \
  "$LOCAL_PATH" "$SERVER:$REMOTE_PATH"

echo "Сборка и перезапуск..."
ssh "$SERVER" "cd $REMOTE_PATH && rm -rf .next && npm run build && sudo ss -tlnp | grep ':3000' | grep -oP 'pid=\K[0-9]+' | xargs -r sudo kill && (pm2 restart demo-behavora || pm2 start npm --name demo-behavora -- start) && pm2 save"

echo "Деплой завершён!"

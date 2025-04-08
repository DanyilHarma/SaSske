#!/bin/sh

# Устанавливаем зависимости, если node_modules нет
if [ ! -d "node_modules" ]; then
  echo "📦 Installing node modules..."
  npm install
fi

# Применение миграций (или можно на проде не делать, если управляется вручную)
echo "🔄 Running migrations..."
npx prisma migrate deploy

# Генерация Prisma Client
echo "⚙️ Generating Prisma client..."
npx prisma generate

echo "🚀 Starting server..."
npm run dev

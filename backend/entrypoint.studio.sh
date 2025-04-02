#!/bin/sh

echo "🧪 Starting Prisma Studio..."

npx prisma generate
npx prisma studio --port 5555
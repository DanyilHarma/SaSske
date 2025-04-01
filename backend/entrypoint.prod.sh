#!/bin/sh

# Генерация Prisma Client
npx prisma generate

# Применение миграций (или можно на проде не делать, если управляется вручную)
npx prisma migrate deploy

# Сборка проекта
npm run build

# Запуск собранного проекта
npm run start

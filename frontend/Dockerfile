# Используем официальный образ Node.js с поддержкой Alpine
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем package.json и package-lock.json, чтобы установить зависимости
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
COPY . .

# Открываем порт Next.js (обычно 3000)
EXPOSE 3000

# Запускаем Next.js в режиме разработки
CMD ["npm", "run", "dev"]

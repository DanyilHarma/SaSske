# Базовый образ с Node.js (используем официальную версию LTS)
FROM node:18-alpine 

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем NODE_ENV в development
ENV NODE_ENV=development

# Копируем файлы package.json и package-lock.json в контейнер
COPY package*.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта в контейнер
COPY . .

# Компилируем TypeScript перед запуском
RUN npm run build

# Открываем порт, который будет использоваться внутри контейнера
EXPOSE 5000

# Запускаем сервер
CMD ["npm", "run", "dev"]

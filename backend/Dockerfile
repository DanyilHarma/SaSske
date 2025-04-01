# Базовый образ с Node.js (используем официальную версию LTS)
FROM node:18-alpine

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Устанавливаем NODE_ENV в development
ENV NODE_ENV=development

# Копируем явно package.json и package-lock.json
COPY package.json .
COPY package-lock.json .

# Устанавливаем зависимости
RUN npm install

# Копируем весь код проекта
COPY . .

# Делаем entrypoint-скрипты исполняемыми
RUN chmod +x entrypoint.dev.sh entrypoint.prod.sh

# Указываем точку входа (можно переопределить в docker-compose)
ENTRYPOINT ["sh", "entrypoint.dev.sh"]

# Открываем порт, который будет использоваться внутри контейнера
EXPOSE 5000

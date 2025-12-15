# FROM node:20

# WORKDIR /app

# COPY . .

# WORKDIR /app/client
# RUN npm install
# RUN npm run build

# WORKDIR /app/server
# RUN npm install

# EXPOSE 3000

# CMD [ "node", "app.js" ]

FROM node:20-alpine

# 1. Устанавливаем рабочую директорию
WORKDIR /app

# 2. Копируем package.json для кэширования
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# 3. Устанавливаем зависимости клиента
WORKDIR /app/client
RUN npm install

# 4. Копируем ВЕСЬ исходный код клиента (включая index.html!)
COPY client/ ./

# 5. Собираем клиент
RUN npm run build

# 6. Устанавливаем зависимости сервера
WORKDIR /app/server
RUN npm install

# 7. Копируем исходный код сервера
COPY server/ ./

# 8. Копируем собранный клиент в папку для статики
RUN mkdir -p /app/server/public && \
    cp -r /app/client/dist/* /app/server/public/

# 9. Запускаем сервер
WORKDIR /app/server
EXPOSE 3000
CMD ["node", "app.js"]
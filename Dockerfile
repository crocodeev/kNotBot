FROM node:18

WORKDIR /app

COPY . .

CMD ["node", "./build/index.js"]
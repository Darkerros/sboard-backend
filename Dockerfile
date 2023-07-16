FROM node:18.11

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install && npm run build

COPY . .
COPY ./dist ./dist

CMD ["npm","run","start:prod"]

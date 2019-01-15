FROM node:latest

WORKDIR /usr/app

ENV PORT 3000

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]

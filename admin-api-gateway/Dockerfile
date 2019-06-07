FROM node:10.15 AS base

WORKDIR /usr/app

ENV PORT 3000



FROM base

COPY package*.json ./

RUN npm ci --only=production

COPY . .

CMD ["npm", "start"]

FROM node:10.15 AS base

WORKDIR /usr/app

ENV PORT 3000



FROM base AS build

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build



FROM base

COPY package*.json ./

RUN npm ci --only=production

COPY --from=build /usr/app/dist ./

CMD ["npm", "start"]

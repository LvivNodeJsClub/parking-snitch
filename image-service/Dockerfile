FROM node:latest

USER node

WORKDIR /home/node/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm build

CMD [ "npm", "start" ]
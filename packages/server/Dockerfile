FROM node:alpine

WORKDIR /usr/src/server

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

CMD [ "npm", "start" ]

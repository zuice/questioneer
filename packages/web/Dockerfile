FROM node:alpine

WORKDIR /usr/src/web

COPY package*.json .
RUN npm install

COPY . .
RUN npx next build

CMD [ "npx", "next", "start" ]

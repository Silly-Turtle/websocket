FROM node:slim

WORKDIR /home/websocket

COPY ./package.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]

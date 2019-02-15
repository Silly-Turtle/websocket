FROM node:slim

WORKDIR /home/websocket

COPY ./package.json ./

RUN npm install --only=prod

COPY . .

CMD ["npm", "start"]

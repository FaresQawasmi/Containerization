FROM node:16-alpine

WORKDIR /enter_data

ADD package*.json ./

RUN npm install

ADD . .

CMD ["npm","start"]
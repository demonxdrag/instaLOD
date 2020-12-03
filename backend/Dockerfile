FROM node:10

WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]
FROM node:12

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR /usr/src/app    

RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]

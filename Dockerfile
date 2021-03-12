FROM node

COPY package*.json ./

RUN npm install

WORKDIR src

COPY src ./

CMD [ "node", "index.js" ]

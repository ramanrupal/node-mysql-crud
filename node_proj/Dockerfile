FROM node:alpine

WORKDIR /usr/app/src 

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","mysql_crud.js"]

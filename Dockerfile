FROM node:18-alpine3.15

WORKDIR /usr/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

#CMD ["yarn", "run", "start:debug"]

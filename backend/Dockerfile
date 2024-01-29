# FROM node:16-alpine as build

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm install

# COPY . .

# RUN npm run build

# FROM node:16-alpine as production

# ARG NODE_ENV=production
# ENV NODE_END=${NODE_ENV}
# ENV MONGODB_USERNAME=karavel_app
# ENV MONGODB_PASSWORD=karavelapp2023
# ENV MONGODB_URL=cluster0.oem86y1.mongodb.net
# ENV MONGODB_NAME=karavel

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm ci --only=production

# COPY --from=build /usr/src/app/dist ./dist

# RUN npm install crypto-js

# EXPOSE $PORT

# CMD ["node", "dist/server.js"]

FROM node:20

WORKDIR /app

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl && \
    apt-get install -y nodejs &&\
    npm --version

COPY package*.json ./

ENV MONGODB_USERNAME=karavel_app
ENV MONGODB_PASSWORD=karavelapp2023
ENV MONGODB_URL=cluster0.oem86y1.mongodb.net
ENV MONGODB_NAME=karavel

RUN npm install

COPY . .

EXPOSE $PORT

CMD ["npm", "run", "dev"]
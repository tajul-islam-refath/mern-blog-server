# Use official node image as base
FROM node:16-alpine

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#install app dependencies
COPY package.json .
COPY package-lock.json .

RUN npm install
# Use official node image as base
FROM node:16-alpine

WORKDIR /server

# add `/app/node_modules/.bin` to $PATH
ENV PATH /server/node_modules/.bin:$PATH


COPY package.json .
COPY package-lock.json .

#install app dependencies
RUN npm install

#copy source code
COPY . .

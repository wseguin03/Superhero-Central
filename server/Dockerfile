# Server Dockerfile
FROM node:18.12.0
WORKDIR /server
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]
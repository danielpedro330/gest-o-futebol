FROM node:22-alpine
WORKDIR /usr/src/pelota-node-api
COPY package*.json ./
RUN npm install --only=prod
COPY . .
RUN npm run build
EXPOSE 3333
CMD ["npm", "start"]
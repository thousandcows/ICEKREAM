FROM node:16.4.2-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
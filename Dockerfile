FROM node:16.15.1-alpine
WORKDIR /Selec-Maintainence-App-Backend
ADD package*.json ./
RUN npm install
ADD app.js ./
ADD .env ./
ADD ./Controllers ./
ADD ./Models ./
ADD ./Middleware ./
ADD ./Routes ./
CMD [ "node", "app.js"]
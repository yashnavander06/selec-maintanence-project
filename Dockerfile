FROM node:16.15.1-alpine
WORKDIR /selec-maintainence-backend
COPY package*.json .
RUN npm install
COPY . ./selec-maintainence-backend
EXPOSE 3000
CMD [ "npm", "start"]
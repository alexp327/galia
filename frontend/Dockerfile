FROM node:20.17.0

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
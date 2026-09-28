FROM node:22-alpine

WORKDIR /app

# Required to compile native Node modules such as better-sqlite3
RUN apk add --no-cache build-base python3 py3-setuptools

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
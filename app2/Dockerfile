FROM node:18-alpine

WORKDIR /app2

COPY package.json .
COPY package-lock.json .

RUN npm install

# COPY package*.json ./
# RUN npm install

COPY . .

EXPOSE 3010

CMD ["npm", "start"]

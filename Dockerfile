FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD ["yarn", "dev"]

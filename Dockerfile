FROM node:20 as common-build-stage

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV  NODE_ENV production

EXPOSE 3000

CMD ["node","./dist/main"]
FROM node:16

USER root

RUN apt-get update

ENV PORT=3333

EXPOSE 3333

WORKDIR /app

COPY [ "package.json", "yarn.lock" ] .

RUN yarn

COPY . .

CMD ["yarn", "dev"]
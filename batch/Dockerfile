FROM node:8.14.0-alpine

ENV APP_DIR /var/www/app

RUN mkdir -p $APP_DIR
WORKDIR $APP_DIR

COPY . $APP_DIR
RUN cd $APP_DIR

RUN yarn
RUN yarn build

EXPOSE 3000

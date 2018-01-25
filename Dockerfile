FROM ruby:alpine

ENV LANG ja_JP.UTF-8

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY Gemfile /usr/src/app/
COPY Gemfile.lock /usr/src/app/

RUN apk update && \
    apk upgrade && \
    apk add --update --no-cache --virtual=.build-dependencies \
      build-base \
      curl-dev \
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      mariadb-dev \
      postgresql-dev \
      ruby-dev \
      yaml-dev \
      nodejs \
      zlib-dev && \
    apk add --update --no-cache \
      bash \
      git \
      openssh \
      mariadb-client \
      postgresql \
      ruby-json \
      tzdata \
      yaml

COPY . .
RUN bundle install

RUN npm i -g yarn
RUN rails assets:precompile RAILS_ENV=production

EXPOSE 3000
CMD rails s -p 3000 -b '0.0.0.0'
FROM node:12-slim

ENV HUSKY_SKIP_INSTALL true
ENV NODE_ENV production

RUN apt-get update && apt-get install -y \
    zip \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /dependencies/nodejs

COPY package*.json ./

RUN npm ci

WORKDIR /dependencies


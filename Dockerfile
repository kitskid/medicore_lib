FROM node:22-alpine

RUN apk add --no-cache bash curl git

ENV SHELL=/bin/bash

RUN corepack enable pnpm && pnpm setup && source /root/.bashrc && pnpm config set store-dir /.pnpm-store

WORKDIR /app

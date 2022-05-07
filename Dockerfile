FROM node:16 AS build

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

FROM nginx:1.21.6-alpine
COPY --from=build /app/dist /usr/share/nginx/html
LABEL org.opencontainers.image.source https://github.com/Tasztalos69/dict
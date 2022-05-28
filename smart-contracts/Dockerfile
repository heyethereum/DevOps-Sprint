FROM node:17-alpine as build 

WORKDIR /code

COPY package.json .
COPY package-lock.json .

RUN npm ci --production

COPY . .

RUN npm install

RUN npm run build

# NGINX Web Server
FROM nginx:1.12-alpine as prod

COPY --from=build /code/build  /usr/share/nginx/html

COPY nginx.conf /etc/ngnix/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
FROM node:17.6
MAINTAINER woow_wu7
COPY . /app/
WORKDIR /app
RUN npm install
RUN npm run docs:build

FROM nginx
COPY --from=0 /app/docs/.vuepress/dist /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

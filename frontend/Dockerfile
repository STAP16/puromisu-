#Builder стаdия

FROM node:alpine AS build


COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#Nginx стадия (раздача статики)
FROM nginx:stable-alpine
#Универсальный код, копируем наши статик файлы в nginx
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
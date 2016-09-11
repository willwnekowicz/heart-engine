FROM nginx

RUN npm run build

COPY public /usr/share/nginx/html

FROM nginx

RUN npm install
RUN npm run build

COPY public /usr/share/nginx/html

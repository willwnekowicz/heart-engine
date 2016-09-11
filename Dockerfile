FROM nginx

RUN sudo apt-get update
RUN sudo apt-get install nodejs
RUN sudo apt-get install npm
RUN npm install
RUN npm run build

COPY public /usr/share/nginx/html

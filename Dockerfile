FROM nginx

WORKDIR /usr/share/react

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

RUN apt-get update && apt-get upgrade -y && apt-get install -y curl && \
    apt-get install -y nodejs &&\
    npm --version

COPY package*.json ./

RUN npm install

COPY . . 

RUN npm run build

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

RUN rm -r /usr/share/nginx/html/*

RUN cp -a build/. /usr/share/nginx/html

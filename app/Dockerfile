# docker build -t docker_nginx .
# docker run --name docker_nginx_1 -p 80:80 -p 443:443 docker_nginx

FROM nginx:stable
MAINTAINER Mohammad Islam

COPY config /etc/nginx/

RUN ln -sf /dev/stdout /var/log/nginx/static.log

CMD ["nginx"]

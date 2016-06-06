FROM nginx:stable
MAINTAINER Mohammad Islam

COPY config /etc/nginx/

RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
RUN ln -sf /etc/nginx/sites-available/docker.me /etc/nginx/sites-enabled/docker.me

EXPOSE 80 443

CMD ["nginx"]

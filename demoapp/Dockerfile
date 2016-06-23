FROM nginx:stable
MAINTAINER Mohammad Islam

# Configure Nginx
COPY config /etc/nginx/
RUN ln -sf /dev/stdout /var/log/nginx/static.log

# Run Nginx
CMD ["nginx"]

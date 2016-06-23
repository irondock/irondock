FROM nginx:stable
MAINTAINER Mohammad Islam

# Configure Nginx
COPY config /etc/nginx/
RUN ln -sf /dev/stdout /var/log/nginx/static.log

# Install cURL >= 7.40
RUN apt-get update && \
    apt-get -y install wget build-essential && \
    wget https://curl.haxx.se/download/curl-7.49.1.tar.gz && \
    tar -xzf curl-7.49.1.tar.gz && \
    rm curl-7.49.1.tar.gz && cd curl-7.49.1 && ./configure --prefix=/usr/local && \
    make && make install && \
    ln -sf /usr/local/lib/libcurl.so.4 /usr/lib/libcurl.so.4

# Run Nginx
CMD ["nginx"]

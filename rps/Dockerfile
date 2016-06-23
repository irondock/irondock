FROM phusion/baseimage:0.9.18
MAINTAINER Mohammad Islam

# Use baseimage-docker's init system
CMD ["/sbin/my_init"]

# Install Nginx and PHP
RUN apt-get update && \
    apt-get -y install nginx php5-fpm

# Install cURL >= 7.40 (required to communicate with Docker API)
RUN apt-get -y purge --auto-remove curl libcurl3 && \
    apt-get -y install wget build-essential && \
    wget https://curl.haxx.se/download/curl-7.49.1.tar.gz && \
    tar -xzf curl-7.49.1.tar.gz && \
    rm curl-7.49.1.tar.gz && cd curl-7.49.1 && ./configure --prefix=/usr/local && \
    make && make install && \
    cd .. && rm -rf curl-7.49.1 && \
    ln -sf /usr/local/lib/libcurl.so.4 /usr/lib/libcurl.so.4

# Give PHP access to Docker socket
RUN usermod -a -G users www-data

# Configure PHP
RUN sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g" /etc/php5/fpm/php.ini
RUN sed -i "s/expose_php\s*=\s*On/expose_php = Off/ig" /etc/php5/fpm/php.ini
RUN sed -i -e "s/;daemonize\s*=\s*yes/daemonize = no/ig" /etc/php5/fpm/php-fpm.conf

# Configure Nginx
RUN rm -rf /etc/nginx/sites-available /etc/nginx/sites-enabled
COPY config/nginx /etc/nginx/
RUN ln -sf /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default
RUN ln -sf /etc/nginx/sites-available/admin /etc/nginx/sites-enabled/admin

# Forward Nginx logs to Docker's log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

# Add Nginx and PHP daemons
RUN mkdir /etc/service/nginx
COPY config/daemons/nginx.sh /etc/service/nginx/run
RUN chmod +x /etc/service/nginx/run
RUN mkdir /etc/service/phpfpm
COPY config/daemons/phpfpm.sh /etc/service/phpfpm/run
RUN chmod +x /etc/service/phpfpm/run

# Expose ports for HTTP and HTTPS
EXPOSE 80 443

# Clean up APT when done
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

FROM phusion/baseimage:0.9.18
MAINTAINER Mohammad Islam

# Use baseimage-docker's init system
CMD ["/sbin/my_init"]

# Install Nginx and PHP
RUN apt-get update
RUN DEBIAN_FRONTEND="noninteractive" apt-get install -y nginx php5-fpm php5-cli

# Configure PHP
RUN sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g" /etc/php5/fpm/php.ini
RUN sed -i -e "s/;daemonize\s*=\s*yes/daemonize = no/g" /etc/php5/fpm/php-fpm.conf

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

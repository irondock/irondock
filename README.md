# Dockerize

Containerize application servers with docker containers and use an Nginx server as a reverse proxy and a load balancer in front.

#### System Architecture

![diagram]

## How to do it?

#### Create Network

First create a bridge network so that the Nginx server container can communicate with the application containers:
```
docker network create --driver=bridge --subnet=172.68.0.0/16 --gateway=172.68.0.254 br0
```

#### Run Nginx

Build the Nginx image:
```
docker build -t dockerize_nginx nginx
```

And create a container from that image:
```
docker run --name=dockerize_nginx_1 --publish 80:80 --publish 443:443 --net=br0 --ip=172.68.0.253 dockerize_nginx
```

#### Run App Server

Build the app image:
```
docker build -t dockerize_app app
```

And create a container from that image:
```
docker run --name=dockerize_app_1 --net=br0 --ip=172.68.0.1 --volume=$(pwd)/app/src:/srv/sites/docker.me/public dockerize_app
```

#### See in Action

Make sure that you added a new host name at `/etc/hosts` to access the default Docker machine:
```
sudo nano /etc/hosts
```
Add the following line:
```
192.168.99.100 docker.me www.docker.me
```
Now visit [http://docker.me/](http://docker.me/) and you should see the welcome message.

#### Development

If you make any update, first stop the running containers:
```
docker stop dockerize_nginx_1 dockerize_app_1 && docker rm dockerize_nginx_1 dockerize_app_1
```

And rebuild the images:
```
docker rmi -f dockerize_nginx dockerize_app && docker build -t dockerize_nginx nginx && docker build -t dockerize_app app
```

Then run both containers again (as described before).

[diagram]:https://cloud.githubusercontent.com/assets/508043/15878834/3b26864e-2cec-11e6-8e06-84ec581fb1f9.png

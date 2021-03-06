# IronDock

IronDock makes it easy to containerize application servers with docker containers and use an Nginx server as a reverse proxy and a load balancer in front. It's a powerful administration tool for to help developers developing and managing apps using Docker.

#### System Architecture

![diagram]

## Quick Start

#### Install Docker Toolbox

Download and install Docker Toolbox if you are on Mac or Windows, and if you don't have Docker Toolbox installed already:

[Download Docker Toolbox][docker-toolbox]

#### Create a bridge network

Create a bridge network so that the Nginx server container can communicate with the application containers:
```
docker network create --driver=bridge --subnet=172.68.0.0/16 --gateway=172.68.0.254 br0
```

#### Run the RPS (Reverse Proxy Server) container

Build the RPS image:
```
docker build -t irondock/rps rps
```

And create a container from that image:
```
docker run --name=rps --publish=80:80 --publish=443:443 --net=br0 --ip=172.68.0.253 --volume=$(pwd)/rps/admin:/srv/sites/admin --volume=/var/run/docker.sock:/var/run/docker.sock irondock/rps
```

#### See in action

Make sure that you added a new host name at `/etc/hosts` to access the default Docker machine:
```
sudo nano /etc/hosts
```
Add the following line:
```
192.168.99.100 irondock.local demo.app www.demo.app
```
Now visit [http://irondock.local/](http://irondock.local/) and you should see the IronDock Dashboard.

#### Run the demo app container

Build the app image:
```
docker build -t irondock/demoapp demoapp
```

And create a container from that image:
```
docker run --name=demoapp --net=br0 --ip=172.68.0.1 --volume=$(pwd)/demoapp/src:/srv/sites/demo.app/public irondock/demoapp
```

Enable vhost for the demo app from RPS and reload Nginx:

```
docker exec rps ln -s /etc/nginx/sites-available/demo.app /etc/nginx/sites-enabled/demo.app
docker exec rps service nginx reload
```

Now visit [http://demo.app/](http://demo.app/) and you should see the welcome message.

#### Further development

If you make any update, first stop the running containers:
```
docker rm -f rps demoapp
```

And rebuild the images:
```
docker rmi -f irondock/rps irondock/demoapp && docker build -t irondock/rps rps && docker build -t irondock/demoapp demoapp
```

Then run both containers again (as described before).

#### Vagrant VM

As an additional reference for future implementation on a production environment, a Vagrantfile and a provisioning script is provided in order to further test on an isolated virtual machine (to simulate a production server).

[diagram]:https://cloud.githubusercontent.com/assets/508043/15878834/3b26864e-2cec-11e6-8e06-84ec581fb1f9.png
[docker-toolbox]:https://www.docker.com/products/docker-toolbox

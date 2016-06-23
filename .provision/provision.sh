#!/usr/bin/env bash

# Re-synchronize the APT package index files from their sources
apt-get update

# Use colored prompt for all users
echo -e "\nforce_color_prompt=yes" >> /etc/bash.bashrc

# Install git and python
apt-get install -y git python

# Install dotfiles
su - vagrant -c "git clone https://github.com/mislam/dotfiles.git /home/vagrant/.dotfiles && /home/vagrant/.dotfiles/scripts/install.sh"

# Change to "/vagrant" directory after login
echo -e "\ncd /vagrant" >> /home/vagrant/.bashrc

# Add the new GPG key
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D

# Add an entry for your Ubuntu operating system
echo "deb https://apt.dockerproject.org/repo ubuntu-trusty main" | tee /etc/apt/sources.list.d/docker.list

# Update the APT package index
apt-get update

# Install linux-image-extra package for the kernel version
apt-get install -y linux-image-extra-$(uname -r)

# Install Docker
apt-get install -y docker-engine

# Add vagrant user to docker group
usermod -aG docker vagrant

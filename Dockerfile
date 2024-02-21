FROM node:20.11.1

WORKDIR /usr/src/app

RUN npm install -g npm@9.8.1

# Install Ionic and Capacitor
RUN npm i -g @ionic/cli@7.1.1 \
  capacitor@0.5.5

# Setting Ionic
# RUN ionic --no-interactive config set -g daemon.updates false

# General packages
RUN apt-get update -q
# RUN apt-get install -q \
  # curl \
  # git \
  # wget \
  # unzip \
  # zip \
  # nano \
  # vim \
  # jq \
  # net-tools \
  # iputils-ping \
  # dnsutils \
  # iproute2 \

  # binutils-gold \
  # make \
  # g++ \
  # gcc \
  # gnupg \
  # libgcc \
  # python3

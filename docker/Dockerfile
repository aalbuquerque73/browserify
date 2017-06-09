FROM node

ENV SHELL=bash

RUN mkdir -p /home/app

WORKDIR /home/app

COPY bashrc /root/.bashrc

RUN npm install -g gulp

CMD bash

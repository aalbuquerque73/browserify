FROM node

ENV SHELL=bash

RUN mkdir -p /home/app

WORKDIR /home/app

COPY bashrc /root/.bashrc
COPY server.js package.json ./

RUN npm install -g nodemon \
 && npm install -g babel-cli \
 && npm install babel-preset-es2015 babel-preset-stage-2

CMD nodemon server --exec babel-node --presets es2015,stage-2
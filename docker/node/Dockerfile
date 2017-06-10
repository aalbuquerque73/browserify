FROM node

ENV SHELL=bash

RUN mkdir -p /home/app

WORKDIR /home/app

COPY bashrc /root/.bashrc

RUN npm install -g gulp nodemon \
 && npm install -g babel-cli \
 && npm install babel-preset-es2015 babel-preset-stage-2

ENTRYPOINT [ "nodemon" ]
CMD [ "--exec", "gulp" ]
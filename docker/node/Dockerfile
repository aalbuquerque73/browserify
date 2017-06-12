FROM node

ENV SHELL=bash

RUN mkdir -p /home/app

WORKDIR /home/app

COPY bashrc /root/.bashrc
COPY start.sh .

RUN npm install -g gulp nodemon babel-cli \
 && npm install gulp babel-preset-es2015 babel-preset-stage-2

ENTRYPOINT [ "bash" ]
CMD [ "start.sh" ]

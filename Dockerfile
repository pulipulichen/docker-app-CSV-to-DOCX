FROM pudding/docker-app:node-18-7z-20230521
# FROM node:21.6-bullseye

RUN apt-get update --fix-missing

RUN apt-get install -y python3 python3-pip
RUN pip3 install python-docx

COPY ./package.json /package.json
WORKDIR /
RUN npm i


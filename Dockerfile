FROM node:alpine
 
WORKDIR /hisapp

COPY ./ /hisapp/

RUN npm install --legacy-peer-deps

COPY . /hisapp/

CMD ["npm","start"]

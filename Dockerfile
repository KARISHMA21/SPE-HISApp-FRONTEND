FROM node:alpine
WORKDIR /hisAapp
COPY ./package.json /hisAapp
RUN npm install --legacy-peer-deps
COPY . /hisAapp
EXPOSE 3080
CMD ["npm","start"]
FROM node:carbon-jessie
RUN mkdir /src
WORKDIR /src
COPY package.json /src/
RUN npm install
COPY . /src
EXPOSE 3001
CMD ["npm","run-script","start:prod"]
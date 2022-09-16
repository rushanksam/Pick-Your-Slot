FROM node:13.12.0-alpine

WORKDIR /usr/share/PickYourSlot/product-webapp
ENV PATH /usr/share/PickYourSlot/product-webapp/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./
CMD ["nmp", "run", "start"]
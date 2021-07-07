FROM node:14.17-alpine
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app
COPY package-lock.json /usr/app
RUN npm install
RUN npm run build
COPY . .
ENV PORT=4000
CMD npm run start:dev
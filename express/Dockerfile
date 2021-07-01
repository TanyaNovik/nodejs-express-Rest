FROM node:14.17-alpine
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY package.json /usr/app
COPY package-lock.json /usr/app
RUN npm install && npm install tsc -g
RUN tsc
COPY . .
ENV PORT=4000
CMD npm run dev
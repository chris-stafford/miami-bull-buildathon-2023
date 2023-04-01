# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:14.17.6 as build-stage

# install chrome for protractor tests
#RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
#RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
#RUN apt-get update && apt-get install -yq google-chrome-stable

# set working directory
RUN mkdir /app
WORKDIR /app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
#RUN npm install -g @angular/cli@9.1.4

COPY ./ /app/

#build solution
ARG configuration
RUN npm run build --prod -- --output-path=./dist/out --configuration $configuration

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17.10
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 9090
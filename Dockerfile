FROM node:14.15.1-alpine
WORKDIR //usr/src/app
COPY package*.json ./
RUN yarn 
COPY . .
EXPOSE 3001
ENTRYPOINT ["sh","entrypoint.sh"]

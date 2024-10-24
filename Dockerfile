FROM --platform=linux/amd64 node:18-alpine
ENV NODE_ENV=production
WORKDIR /usr/server/app

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install
#RUN npm install -g npm@9.6.1
ARG CI_COMMIT_SHA
ENV CI_COMMIT_SHA=$CI_COMMIT_SHA
COPY ./ .

RUN npm run build:cf
CMD ["npm", "run" ,"start:cf"]
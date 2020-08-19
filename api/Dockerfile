# USAGE: 
#   Build image - $ docker build --tag pokemon . # from /pokemon/apis/client dir
#   Run image - $ docker run -it -p 4000:8080 pokemon:latest
#   Gcloud container registry instructions here: https://cloud.google.com/container-registry/docs/quickstart
#   Push container to gcloud $ docker push gcr.io/pokemon-dev/pokemon

# used base node-alpine to get packages (image includes npm)
# FROM node as builder
FROM node:10 as builder

RUN pwd ; ls -a

# If the WORKDIR doesn’t exist, it will be created even if it’s not used in any subsequent
WORKDIR /build

RUN node -v
RUN npm -v 
RUN pwd ; ls -a

# prod build files
COPY src ./src
COPY tsoa.yml .
COPY tsconfig.prod.json .
COPY package.json .
COPY package-lock.json .

# Remove the temp build & lib files if they exist (starting fresh)
RUN rm -rf build
RUN rm -rf lib

# check for src package.json and package-lock.json
RUN pwd ; ls -a

# install globals
RUN npm i -g typescript@3.7.5 tsoa@3.0.8 js-yaml

# install deps - required otherwise the linter will error
# eg: src/routes.ts:16:26 - error TS2307: Cannot find module 'express'.
RUN npm i

# create prod lib files
RUN js-yaml tsoa.yml > tsoa.json
RUN tsoa routes
RUN tsc --project tsconfig.prod.json

# remove files not needed for production build
RUN rm -rf src
RUN rm -rf tsoa.yml
RUN rm -rf tsconfig.prod.json

# check that src was removed so all that is 
# left is the transpiled prod build lib
# and the dependent files needed to run it
RUN pwd ; ls -a

# use ww alpine images 
#   Note1: impage excludes npm 
#   Note2: last FROM stmt in docker file defines the final image to use for build
FROM node:10-alpine

WORKDIR /app

# copy over everything from build
# NOTE: src previously removed
COPY --from=builder /build/. .

# check for lib (should not be a src)
RUN pwd ; ls -a

# install npm for production
RUN npm i --prod

# set non-sensitive secret environment variables (use secret manager for secrets)
ENV build dev
ENV cicd local
ENV portal_url http://some.pokemon.com
ENV port 8080

EXPOSE 8080

# Run the web service on container startup
CMD [ "npm", "run", "start-docker" ]

# Build the environment.
FROM node:18

# Install git to resolve issues installing the
# nypl/dgx-header-component package.
RUN apk add git

WORKDIR /

ARG airtable_api_key

# Newrelic settings
ARG NEW_RELIC_LICENSE_KEY
ARG NEW_RELIC_APP_NAME 

ARG NEXT_PUBLIC_ADOBE_ANALYTICS 

# Set environment variables. NODE_ENV is set early because we
# want to use it when running `npm install` and `npm run build`.
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=3000 \
    NODE_ENV=production
ENV NEXT_PUBLIC_AIRTABLE_API_KEY $airtable_api_key
# Sets READER_VERSION at build time.  To revert, remove this variable entirely.
ENV NEXT_PUBLIC_READER_VERSION=v2
ENV NEW_RELIC_LICENSE_KEY $NEW_RELIC_LICENSE_KEY
ENV NEW_RELIC_APP_NAME $NEW_RELIC_APP_NAME
ENV NEXT_PUBLIC_ADOBE_ANALYTICS $NEXT_PUBLIC_ADOBE_ANALYTICS

# Install dependencies.
COPY package.json package-lock.json ./
RUN npm ci --cache .npm

# Copy the app files.
COPY . ./

EXPOSE $PORT

# Build the app!
RUN npm run build

# CMD is the default command when running the docker container.
CMD npm run start:newrelic
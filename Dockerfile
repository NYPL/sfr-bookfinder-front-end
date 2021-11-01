# Build the environment.
FROM node:16.13.0-alpine

# Install git to resolve issues installing the
# nypl/dgx-header-component package.
RUN apk add git

WORKDIR /

ARG airtable_api_key

# Set environment variables. NODE_ENV is set early because we
# want to use it when running `npm install` and `npm run build`.
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=3000 \
    NODE_ENV=production
ENV NEXT_PUBLIC_AIRTABLE_API_KEY $airtable_api_key
# Sets READER_VERSION at build time.  To revert, remove this variable entirely.
ENV NEXT_PUBLIC_READER_VERSION=v2

# Install dependencies.
COPY package.json ./
RUN npm install

# Copy the app files.
COPY . ./

EXPOSE $PORT

# Build the app!
RUN npm run build

# CMD is the default command when running the docker container.
CMD npm start
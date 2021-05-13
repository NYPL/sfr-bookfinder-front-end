# Build the environment.
FROM node:14.16.0-alpine

# Install git to resolve issues installing the
# nypl/dgx-header-component package.
RUN apk add git

WORKDIR /

ARG airtable-api-key

# Set environment variables. NODE_ENV is set early because we
# want to use it when running `npm install` and `npm run build`.
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=3000 \
    NODE_ENV=production
ENV NEXT_PUBLIC_AIRTABLE_API_KEY $airtable-api-key

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
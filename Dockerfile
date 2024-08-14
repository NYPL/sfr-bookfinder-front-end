FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Install dependencies.
COPY package.json package-lock.json ./
RUN npm ci --cache .npm

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG airtable_api_key
ARG NEW_RELIC_LICENSE_KEY
ARG NEW_RELIC_APP_NAME 
ARG NEXT_PUBLIC_ADOBE_ANALYTICS 
ARG APP_ENV

# Build the app!
RUN npm run build

ENV PATH /app/node_modules/.bin:$PATH
ENV PORT=3000 \
    NODE_ENV=production
ENV NEXT_PUBLIC_AIRTABLE_API_KEY $airtable_api_key
ENV NEW_RELIC_LICENSE_KEY $NEW_RELIC_LICENSE_KEY
ENV NEW_RELIC_APP_NAME $NEW_RELIC_APP_NAME
ENV NEXT_PUBLIC_ADOBE_ANALYTICS $NEXT_PUBLIC_ADOBE_ANALYTICS
ENV APP_ENV $APP_ENV

# RUNNER, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Copy the app files.
COPY . ./

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public

EXPOSE $PORT

# CMD is the default command when running the docker container.
CMD npm run start:newrelic
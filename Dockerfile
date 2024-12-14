# `Dockerfile`

FROM node:20-alpine AS base

#
# INSTALL STAGE
#
FROM base AS prod-deps

# Access yarn with Corepack
RUN corepack enable
# Install apk and curl
RUN apk update && apk add curl bash
WORKDIR /app
COPY package.json yarn-lock.yaml ./
# Fetch deps with caching
RUN --mount=type=cache,id=s/<service-id>-/root/.local/share/yarn/store,target=/root/.local/share/yarn/store \
    yarn fetch --frozen-lockfile
# Install prod deps with caching
RUN --mount=type=cache,id=s/<service-id>-/root/.local/share/yarn/store,target=/root/.local/share/yarn/store \
    yarn install --frozen-lockfile --prod

#
# BUILD STAGE
# 
FROM base AS build

RUN corepack enable
RUN apk update && apk add curl bash
WORKDIR /app
COPY package.json yarn-lock.yaml ./
# Fetch deps with caching
RUN --mount=type=cache,id=s/<service-id>-/root/.local/share/yarn/store,target=/root/.local/share/yarn/store \
    yarn fetch --frozen-lockfile
# Install all deps with caching
RUN --mount=type=cache,id=s/<service-id>-/root/.local/share/yarn/store,target=/root/.local/share/yarn/store \
    yarn install --frozen-lockfile
COPY . .
# Set Node options for increased memory
ENV NODE_OPTIONS="--max-old-space-size=4096"
# Build the application with caching
RUN --mount=type=cache,id=s/<service-id>-/root/.cache/yarn,target=/root/.cache/yarn \
    NODE_ENV=production yarn run build

#
# PRODUCTION STAGE
#
FROM base

RUN corepack enable
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
# Need package.json to specify yarn version which Corepack installs
COPY --from=build /app/package.json ./package.json
# Copy Drizzle config so we can migrate prior to building
COPY --from=build /app/.drizzle ./.drizzle
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
# Expose the port the app runs on
EXPOSE 3333
CMD ["yarn", "start"]
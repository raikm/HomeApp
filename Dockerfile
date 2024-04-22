ARG NODE_VERSION=18.15.0

FROM node:${NODE_VERSION}-slim as base

ARG PORT=9000

ENV NODE_ENV=production

WORKDIR /usr/src/app

# Build
FROM base as build

# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./

# Copy the docs package.json
COPY apps/dashboard/package.json ./apps/dashboard/package.json

RUN npm install

COPY . .

# RUN npm run build
# RUN npm prune

# Run
FROM base

ENV PORT=$PORT

# TODO RUN npm run build

COPY apps/dashboard/.output /usr/src/app/.output
# Optional, only needed if you rely on unbundled dependencies
# COPY --from=build /src/node_modules /src/node_modules

CMD [ "node", ".output/server/index.mjs" ]
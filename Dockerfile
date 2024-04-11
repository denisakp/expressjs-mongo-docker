FROM node:lts-alpine AS base

# Install essential packages
RUN \
    apk add --no-cache libc6-compat &&\
    apk add --no-cache dumb-init

WORKDIR /app

FROM base AS dependenices

COPY package*.json ./

RUN \
  if [ -f package-lock.json ]; then npm install --omit=dev; \
  else echo "Lockfile not found." && exit 1; \
  fi

FROM dependenices AS prune

# prune node_module ro remove dev dependencies modules
RUN npm prune --omit=dev

FROM base AS production

# Copy pruned node_modules and app source code
COPY --from=prune /app/node_modules ./node_modules
COPY . .

# Create and switch to a non-root user
RUN addgroup -S vegeta && adduser -S vegeta -G vegeta
USER vegeta

ENV NODE_ENV production

# expose container port
EXPOSE 3000

# Set dumb-init as the entrypoint
ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "src/server.mjs"]

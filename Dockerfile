FROM node:16-alpine AS builder

# Set NODE_ENV to production
ENV NODE_ENV=production

# Install Yarn
RUN apk add --no-cache yarn

# Create a directory for the app
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy the app code
COPY . .

# Build the app
RUN yarn build


# Create a new image for running the app
FROM node:16-alpine

# Set NODE_ENV to production
ENV NODE_ENV=production

# Create a directory for the app
WORKDIR /app
# Copy build output from builder stage
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["yarn", "start"]

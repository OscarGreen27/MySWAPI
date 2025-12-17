# syntax=docker/dockerfile:1

# Build stage
FROM node:lts-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies (use npm ci for clean installs in CI/CD)
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Prune development dependencies to reduce final image size
RUN npm prune --omit=dev

# Final run stage
FROM node:lts-alpine

# Set environment variable for production
ENV NODE_ENV=production

# Set the working directory inside the container
WORKDIR /app

# Copy only necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules/ ./node_modules
COPY --from=builder /app/dist/ ./dist

# Expose the port your NestJS application listens on (e.g., 3000)
EXPOSE 3000

# Command to run the application when the container starts
CMD ["node", "dist/main.js"]
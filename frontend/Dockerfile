# Stage 1: Build Stage
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# because the app uses the src directory structure
WORKDIR /app/src

# Build the application
RUN npm run build

# Stage 2: Runtime Stage
FROM node:22-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/public /app/public

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

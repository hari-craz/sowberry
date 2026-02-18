FROM node:lts-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
# Use npm ci for reproducible builds
RUN npm ci --omit=dev

# Copy source code
COPY . .

# Environment variables (defaults)
ENV PORT=5000
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start command: Run DB setup then start server
CMD ["sh", "-c", "node config/dbSetup.js && node server.js"]

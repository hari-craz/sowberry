FROM node:18-alpine

WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy source code
COPY . .

# Environment variables (defaults)
ENV PORT=5000
ENV NODE_ENV=production

# Expose port
EXPOSE 5000

# Start command: Run DB setup then start server
CMD ["sh", "-c", "node config/dbSetup.js && node server.js"]

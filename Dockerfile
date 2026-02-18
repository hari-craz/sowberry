# Build Stage
FROM node:lts-alpine as build

# Increase memory limit for node process
ENV NODE_OPTIONS="--max-old-space-size=4096"

WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies using npm ci for cleaner builds
RUN npm ci

# Copy source code
COPY . .

# Environment variable for build
ENV VITE_API_URL=/api

# Build the application
RUN npm run build

# Production Stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

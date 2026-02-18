# Build Stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Environment variable for build (Vite requires env vars during build for static replacement)
# For Nginx proxy setup, we set API_URL to "/api" so browser requests go to Nginx first
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

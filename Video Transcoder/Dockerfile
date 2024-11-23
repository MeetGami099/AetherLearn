# Use the official Node.js image based on Alpine Linux
FROM --platform=linux/amd64 node:18-alpine

# Update package index and install ffmpeg
RUN apk update && apk upgrade && apk add --no-cache ffmpeg

# Set the working directory
WORKDIR /app

# Create necessary directories
RUN mkdir -p videos
RUN mkdir -p result

# Copy package.json and package-lock.json first for better caching
COPY package.json ./ 
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY index.js ./

# Copy the entrypoint script and set permissions
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Verify the file permissions (Optional Debugging Step)
RUN ls -l /usr/local/bin/docker-entrypoint.sh

# Set the entry point (ensure correct shell is used)
ENTRYPOINT ["/bin/sh", "/usr/local/bin/docker-entrypoint.sh"]

# Start the application
CMD ["npm","start"]

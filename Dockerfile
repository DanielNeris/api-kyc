# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies
COPY package*.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy application files
COPY . .

# Set environment variables
ENV NODE_ENV=production

# Generate and apply migrations
RUN yarn migrate

# Expose the application's port
EXPOSE 3333

# Start the application
CMD ["yarn", "start"]

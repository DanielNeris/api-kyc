# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy the application files
COPY . .

# Install dependencies
RUN npm install

# Generate and apply migrations
RUN npm run drizzle-kit generate && npm run drizzle-kit migrate

# Expose the application's port
EXPOSE 3333

# Start the application
CMD ["npm", "run", "dev"]

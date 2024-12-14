# Use Node.js as the base image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the application's port
EXPOSE 3333

# Start the application
CMD ["npm", "run", "dev"]

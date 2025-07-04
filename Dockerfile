# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the entire application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port on which the application will run
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "start:prod"]

# Use the official Node.js image with Alpine Linux as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/reactapp

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your application listens on (if applicable)
EXPOSE 5173

# Define the command to start your application
CMD ["npm", "run", "dev"]

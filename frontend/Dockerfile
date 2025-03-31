# Use an official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /frontend

# Copy package.json and package-lock.json
COPY package.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend
RUN npm run build

# Expose the port for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# Dockerfile for BFF
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]

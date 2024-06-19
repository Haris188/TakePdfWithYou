# Use an official Node.js runtime as a parent image
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install -g typescript
# Install dependencies
RUN npm install
# Copy the rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["npm", "start"]

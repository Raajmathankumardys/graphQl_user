# Use a modern Node.js version
FROM node:18-alpine 

# Create and set the working directory
RUN mkdir -p /app
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Ensure TypeScript is installed globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN npx tsc

# Expose port 8080
EXPOSE 8080

# Run the compiled JavaScript file
CMD ["node", "index.js"]

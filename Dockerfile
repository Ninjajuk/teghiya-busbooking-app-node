# Step 1: Use the official Node.js image as the base image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /

# Step 3: Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port the app will run on (assuming your app runs on port 3000)
EXPOSE 8000

# Step 7: Define the command to start the app
CMD ["npm", "start"]

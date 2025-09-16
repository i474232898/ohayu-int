FROM node:20-alpine

# Set working directory to match the local structure
WORKDIR /app

# Copy package files for both producer and nest-invoke library
COPY apps/producer/package*.json ./apps/producer/
COPY libs/nest-invoke/package*.json ./libs/nest-invoke/

# Install dependencies for nest-invoke library first
WORKDIR /app/libs/nest-invoke
RUN npm ci

# Copy nest-invoke source code and configuration files
COPY libs/nest-invoke/src ./src/
COPY libs/nest-invoke/tsconfig*.json ./
COPY libs/nest-invoke/nest-cli.json ./

# Build the nest-invoke library and create the tarball
RUN npm run build && npm pack

# Install dependencies for producer app
WORKDIR /app/apps/producer
RUN npm i
# RUN npm ci --omit=optional --ignore-scripts

# Install the locally built nest-invoke package
RUN npm install ../../libs/nest-invoke/nest-invoke-0.0.1.tgz

# Copy producer source code and configuration files
COPY apps/producer/src ./src/
COPY apps/producer/tsconfig*.json ./
COPY apps/producer/nest-cli.json ./

# Build the producer application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:dev"]

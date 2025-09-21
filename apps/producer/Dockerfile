FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files for the library first
COPY libs/nest-invoke/package*.json ./libs/nest-invoke/
COPY libs/nest-invoke/nest-cli.json ./libs/nest-invoke/
COPY libs/nest-invoke/tsconfig*.json ./libs/nest-invoke/

# Install dependencies for the library
WORKDIR /app/libs/nest-invoke
RUN npm install

# Copy library source code and build it
COPY libs/nest-invoke/src ./src
RUN npm run build

# Package the library (creates nest-invoke-0.0.1.tgz)
RUN npm pack

# Now copy producer package files and install dependencies
WORKDIR /app
COPY apps/producer/package*.json ./apps/producer/
COPY apps/producer/nest-cli.json ./apps/producer/
COPY apps/producer/tsconfig*.json ./apps/producer/

# Switch to producer directory and install dependencies
# The nest-invoke tgz file should be found at ../../libs/nest-invoke/nest-invoke-0.0.1.tgz
WORKDIR /app/apps/producer
RUN npm install

# Copy producer source code
COPY apps/producer/src ./src

# Build the producer application
RUN npm run build

# Expose the port (NestJS uses port 3000 by default)
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start:prod"]
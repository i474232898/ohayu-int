FROM node:20-alpine

# Set working directory to match the local structure
WORKDIR /app

# Copy package files for both consumer and nest-invoke library
COPY apps/consumer/package*.json ./apps/consumer/
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

# Install dependencies for consumer app
WORKDIR /app/apps/consumer
RUN npm i
# RUN npm ci --omit=optional --ignore-scripts

# Install the locally built nest-invoke package
RUN npm install ../../libs/nest-invoke/nest-invoke-0.0.1.tgz

# Copy consumer source code and configuration files
COPY apps/consumer/src ./src/
COPY apps/consumer/tsconfig*.json ./
COPY apps/consumer/nest-cli.json ./

# Build the consumer application
RUN npm run build

# Start the application
CMD ["npm", "run", "start:dev"]

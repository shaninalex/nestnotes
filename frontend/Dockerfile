# Build
FROM node:18-alpine as node

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Move dist to the nginx and serve
FROM nginx:alpine
COPY --from=node /usr/src/app/dist/frontend /usr/share/nginx/html
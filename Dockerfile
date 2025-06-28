# ───────────────  build  ───────────────
FROM node:20-alpine AS builder
WORKDIR /app

# deterministic, fast installs
COPY package.json package-lock.json ./
RUN npm ci

# source → production bundles (client + server)
COPY . .
RUN npm run build 

# ─────────────── runtime ───────────────
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy built static files
COPY --from=builder /app/dist .

# Copy nginx configuration for SPA
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

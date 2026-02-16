FROM node:20-alpine AS build
WORKDIR /app
COPY package.json tsconfig.json vite.config.ts tailwind.config.js postcss.config.js index.html ./
COPY src ./src
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm install && npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# 빌드 스테이지
FROM --platform=linux/amd64 node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 런타임 스테이지
FROM --platform=linux/amd64 node:lts-alpine as runtime-stage
WORKDIR /app
COPY --from=build-stage /app/dist ./
RUN npm install -g serve
CMD ["serve", "-p", "8080", "-s", "."]

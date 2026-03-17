# build stage
FROM node:22-alpine AS build
WORKDIR /app

# pnpm
RUN corepack enable
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# runtime stage
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

# SPA 라우팅이면 아래 nginx.conf도 같이 쓰는 걸 권장(옵션)
EXPOSE 80
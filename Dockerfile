#build Stage
FROM node:lts AS builder

RUN npm install -g bun
#컨테이너 작업 디렉토리
WORKDIR /usr/app

# 의존성 설치
COPY package*.json ./

RUN bun install
# 애플리케이션 파일 추가
COPY . .
# 애플리케이션 빌드
RUN bun run build

FROM nginx:stable-alpine
COPY --from=builder /usr/app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /ect/nginx/conf.d
WORKDIR /usr/app
ADD run.sh /usr/local/bin/run.sh
RUN chmod +x /usr/local/bin/run.sh
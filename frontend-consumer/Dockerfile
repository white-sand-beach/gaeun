# 1단계: 애플리케이션 빌드
FROM node:20.11.0 as builder
WORKDIR /app

# 필요한 파일들 복사
COPY package*.json ./
RUN npm install

# 빌드 수행
COPY . .
RUN npm run build || exit 1

# 2단계: 빌드된 애플리케이션 실행
FROM node:20.11.0
WORKDIR /app

# 빌드된 애플리케이션 복사
COPY --from=builder /app/dist /feConsumer/app/dist

# nginx 의 default.conf 를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf 를 아래 경로에 복사
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

# 5173 포트 노출
EXPOSE 5173

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["nginx", "-g", "daemon off;"]


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
COPY --from=builder /app/dist /app/dist

# serve 설치
RUN npm install -g serve

# 5173 포트 노출
EXPOSE 5174

# 애플리케이션 실행
ENTRYPOINT ["serve", "-l", "5174", "-s", "dist"]


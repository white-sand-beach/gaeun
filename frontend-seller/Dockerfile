# 1단계: 애플리케이션 빌드
FROM node:20.11.0 as builder
WORKDIR /app

# 필요한 파일들 복사
COPY package*.json ./
RUN npm install

# 빌드 수행
COPY . .
RUN npm run build || exit 1

# 정적 파일을 /app/fe-seller/dist 에 복사
RUN mkdir -p fe-seller/{dist}
RUN cp -r /app/dist /app/fe-seller/dist

# nginx 이미지를 사용. 뒤에 tag가 없으면 latest 를 사용.
FROM nginx

# 정적 파일 복사
COPY --from=builder /app/fe-seller/dist /usr/share/nginx/html/seller

# 80 포트 오픈
EXPOSE 80

# nginx 시작
CMD ["nginx", "-g", "daemon off;"]
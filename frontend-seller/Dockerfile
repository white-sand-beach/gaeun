# 1단계: 애플리케이션 빌드
FROM node:20.11.0
WORKDIR /app

# 필요한 파일들 복사
COPY package*.json ./
RUN npm install

# 빌드 수행
COPY . .
RUN npm run build || exit 1

# 빌드된 애플리케이션 복사
RUN mkdir ./dist
ADD ./dist ./dist

# nginx 이미지를 사용 (뒤에 tag가 없으면 latest를 사용)
FROM nginx

# nginx 의 default.conf를 삭제
RUN rm /etc/nginx/conf.d/default.conf

# host pc 의 nginx.conf를 복사
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf

# 80 포트 오픈
EXPOSE 80

# nginx 시작
CMD ["nginx", "-g", "daemon off;"]
FROM gradle:8.7-jdk21 as builder
WORKDIR /app

# Gradle 빌드에 필요한 파일들 복사
COPY build.gradle settings.gradle /app/
COPY src /app/src

ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get install -y tzdata

RUN ln -sf /usr/share/zoneinfo/Asia/Seoul /etc/localtime

# 빌드 수행
RUN gradle build -x test --parallel --continue

FROM openjdk:21
EXPOSE 8081

# 이미지 생성 시 파일 복사
COPY --from=builder /app/build/libs/*.jar /app/app.jar

CMD ["java", "-jar", "/app/app.jar"]
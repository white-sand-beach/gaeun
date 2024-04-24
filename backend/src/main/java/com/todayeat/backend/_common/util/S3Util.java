package com.todayeat.backend._common.util;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Util {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile multipartFile, String dirNamePrincipal, String dirNamePrincipalId, String dirNameAttribute) throws IOException {
        // 이미지 형식의 파일인지 확인
        if(!Objects.requireNonNull(multipartFile.getContentType()).contains("image")) {
            //ToDo : 에러 처리 하기
        }

        // 새로운 파일 이름 생성
        String fileName = createFileName(multipartFile, createDirName(dirNamePrincipal, dirNamePrincipalId, dirNameAttribute));

        // 메타데이터 설정
        ObjectMetadata metadata = createMetadata(multipartFile);

        try {
            amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), metadata);
        } catch (IOException e) {
            //ToDo : 에러 처리 하기
        }

        return amazonS3.getUrl(bucket, fileName).toString();
    }

    private String createDirName( String dirNamePrincipal, String dirNamePrincipalId, String dirNameAttribute) {
        return dirNamePrincipal + "/" + dirNamePrincipalId + "/" + dirNameAttribute;
    }

    private ObjectMetadata createMetadata (MultipartFile multipartFile) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        return metadata;
    }

    private String createFileName(MultipartFile multipartFile, String dirName) {
        return dirName + "/" + UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
    }

}

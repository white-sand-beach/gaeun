package com.todayeat.backend._common.util;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.todayeat.backend._common.entity.DirectoryType;
import com.todayeat.backend._common.response.error.ErrorType;
import com.todayeat.backend._common.response.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Util {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String upload(MultipartFile multipartFile, DirectoryType directoryType, Long dirNamePrincipalId) {
        //이미지 형식의 파일인지 확인
        if(!Objects.requireNonNull(multipartFile.getContentType()).contains("image")) {
            throw new BusinessException(ErrorType.IMAGE_FORMAT_INVALID);
        }

        //새로운 파일 이름 생성
        String fileName = createFileName(multipartFile, createDirName(directoryType, dirNamePrincipalId));

        //s3 버킷에 이미지 객체 저장
        try {
            amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), createMetadata(multipartFile));
        } catch (AmazonServiceException | IOException e) {
            log.error("S3Util upload putObject error : ", e);
            throw new BusinessException(ErrorType.INTERNAL_SERVER_ERROR);
        }

        //이미지 객체 url 반환
        return amazonS3.getUrl(bucket, fileName).toString();

    }

    //저장할 파일의 경로 생성
    private String createDirName(DirectoryType directoryType, Long dirNamePrincipalId) {
        return directoryType.getDirNamePrincipal() + "/" + dirNamePrincipalId + "/" + directoryType.getDirNameAttribute();
    }

    //저장할 파일의 메타 데이터 생성
    private ObjectMetadata createMetadata (MultipartFile multipartFile) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        return metadata;
    }

    //저장할 파일의 이름 생성
    private String createFileName(MultipartFile multipartFile, String dirName) {
        return dirName + "/" + UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();
    }
}

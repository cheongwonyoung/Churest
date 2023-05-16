package com.ssafy.churest.service;

import com.google.cloud.storage.*;

import com.google.cloud.storage.BlobInfo;
import com.ssafy.churest.entity.Board;
import com.ssafy.churest.entity.Photo;
import com.ssafy.churest.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service("GCSService")
@RequiredArgsConstructor
public class GCSServiceImpl implements GCSService {

    private final Storage storage;
    private final PhotoRepository photoRepository;

    @Override
    public String uploadBoardImage(MultipartFile file, Board board) throws IOException {

        String bucketName = "churest-bucket";

        String saveFileName = UUID.randomUUID() + StringUtils.cleanPath(file.getOriginalFilename());
        try(InputStream inputStream = file.getInputStream()) {
            Image processedImage = ImageIO.read(inputStream);

            BufferedImage scaledBI = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = scaledBI.createGraphics();
            g.drawImage(processedImage, 0, 0, 200, 200, null);
            g.dispose();

            ByteArrayOutputStream os = new ByteArrayOutputStream();
            ImageIO.write(scaledBI, "jpg", os);

            InputStream processedInputStream = new ByteArrayInputStream(os.toByteArray());

            Blob blob = storage.create(BlobInfo.newBuilder(bucketName, saveFileName).build(), processedInputStream);
            saveFileName = blob.getSelfLink().split("/o/")[1];
        } catch (IOException e) {
            e.printStackTrace();
        }

        photoRepository.save(Photo.builder().board(board).file(saveFileName).build());

        return "/" + saveFileName;
    }

    @Override
    public List<String> uploadBoardImageList(List<MultipartFile> file, Board board) throws IOException {
        return null;

    }
}

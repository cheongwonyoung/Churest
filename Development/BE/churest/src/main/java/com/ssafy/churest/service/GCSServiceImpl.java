package com.ssafy.churest.service;

//import com.google.cloud.storage.*;

import com.ssafy.churest.entity.Board;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public class GCSServiceImpl implements GCSService {

//    private final Storage storage;

    @Override
    public String uploadBoardImage(MultipartFile file, Board board) throws IOException {
//        String bucketName = "churest-bucket";
//        String saveFileName = UUID.randomUUID() + StringUtils.cleanPath(file.getOriginalFilename());
//        try(InputStream inputStream = file.getInputStream()) {
//            Image processedImage = ImageIO.read(inputStream);
//
//            BufferedImage scaledBI = new BufferedImage(200, 200, BufferedImage.TYPE_INT_RGB);
//            Graphics2D g = scaledBI.createGraphics();
//            g.drawImage(processedImage, 0, 0, 200, 200, null);
//            g.dispose();
//
//            ByteArrayOutputStream os = new ByteArrayOutputStream();
//            ImageIO.write(scaledBI, "jpg", os);
//
//            InputStream processedInputStream = new ByteArrayInputStream(os.toByteArray());
//
//            storage.create(BlobInfo.newBuilder(bucketName, saveFileName).build(), processedInputStream);
//        } catch (IOException e) {
//            e.printStackTrace();
//        }
//        board.updateFile(saveFileName);
//        return "/" + saveFileName;
        return null;
    }

    @Override
    public List<String> uploadBoardImageList(List<MultipartFile> file, Board board) throws IOException {
        return null;

    }
}

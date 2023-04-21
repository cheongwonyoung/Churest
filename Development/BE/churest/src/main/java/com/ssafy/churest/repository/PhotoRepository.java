package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PhotoRepository extends JpaRepository<Photo, Integer> {
    List<Photo> findAllByBoard_BoardId(int boardId);
}

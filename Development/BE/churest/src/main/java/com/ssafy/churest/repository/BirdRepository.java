package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Bird;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BirdRepository extends JpaRepository<Bird, Integer> {
}

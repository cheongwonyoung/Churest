package com.ssafy.churest.repository;

import com.ssafy.churest.entity.House;
import io.swagger.models.auth.In;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HouseRepository extends JpaRepository<House, Integer> {
}

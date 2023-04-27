package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.BirdResponseDto;
import com.ssafy.churest.entity.Bird;
import com.ssafy.churest.repository.BirdRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("BirdService")
@RequiredArgsConstructor
public class BirdServiceImpl implements BirdService{
    private final BirdRepository birdRepository;
    @Override
    public List<BirdResponseDto.SmallInfo> getBirdList() {
        List<BirdResponseDto.SmallInfo> res = new ArrayList<>();

        List<Bird> birdList = birdRepository.findAll();
        for(Bird bird : birdList){
            BirdResponseDto.SmallInfo info = BirdResponseDto.SmallInfo.fromEntity(bird);
            res.add(info);
        }

        return res;
    }
}

package com.ssafy.churest.dto.resp;

import com.ssafy.churest.entity.Member;
import lombok.Builder;
import lombok.Data;

import java.util.List;

public class SquareResponseDto {

    @Data
    public static class DonateInfo {
        int totalDonateTreeCount;
        int myDonateTreeCount;

        public DonateInfo(int myDonateTreeCount, List<Member> memberList){
            this.myDonateTreeCount = myDonateTreeCount;

            for (Member member:
                    memberList) {
                this.totalDonateTreeCount += member.getGrownTreeCount();
            }
        }
    }
}

package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
public class MemberBirdHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberBirdHouseId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bird_house_id")
    private BirdHouse birdHouse;

    @ColumnDefault("false")
    private Boolean isUsed;

    @Builder
    public MemberBirdHouse(Member member, BirdHouse birdHouse) {
        this.member = member;
        this.birdHouse = birdHouse;
    }

    public MemberBirdHouse updateIsUsed(Boolean isUsed) {
        this.isUsed = isUsed;
        return this;
    }
}

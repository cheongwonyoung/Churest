package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MemberHouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberHouseId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "house_id")
    private House house;

    @ColumnDefault("false")
    private Boolean isUsed;

    @Builder
    private MemberHouse(Member member, House house, Boolean isUsed) {
        this.member = member;
        this.house = house;
        this.isUsed = isUsed;
    }

    public MemberHouse updateIsUsed(Boolean isUsed){
        this.isUsed = isUsed;
        return this;
    }
}

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
}

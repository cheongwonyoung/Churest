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
public class MemberBird {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberBirdId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bird_id")
    private Bird bird;

    @Column(length = 6)
    private String nickname;

    @ColumnDefault("false")
    private Boolean isUsed;

    @Builder
    private MemberBird(Member member, Bird bird) {
        this.member = member;
        this.bird = bird;
    }

    public MemberBird updateNickname(String nickname) {
        this.nickname = nickname;
        return this;
    }

    public MemberBird updateIsUsed(Boolean isUsed) {
        this.isUsed = isUsed;
        return this;
    }
}

package com.ssafy.churest.entity;



import com.sun.istack.NotNull;
import lombok.*;

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

}

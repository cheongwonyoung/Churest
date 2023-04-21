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
@Builder
public class MemberBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberBoardId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    private int locationX;

    private int locationY;
}

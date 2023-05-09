package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class TreeLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int treeLogId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id")
    private Board board;

    @CreationTimestamp
    private LocalDate date;

    private int score;

    @Builder
    public TreeLog(Board board, int score){
        this.board = board;
        this.score = score;
    }
}

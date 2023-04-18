package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

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
    private LocalDateTime date;

    private int score;

}

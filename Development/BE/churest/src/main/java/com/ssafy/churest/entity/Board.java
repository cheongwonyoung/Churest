package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int boardId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tree_id")
    private Tree tree;

    @NotNull
    @OneToMany(mappedBy = "board")
    private List<TreeLog> treeLogs = new ArrayList<>();

    @Column(length = 20)
    private String title;

    @Column(length = 140)
    private String content;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @Column(length = 5)
    private String weather;

    private int locationX;

    private int locationY;

    @ColumnDefault("false")
    private boolean isDeleted;

}

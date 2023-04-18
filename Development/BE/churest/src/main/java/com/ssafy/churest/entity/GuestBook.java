package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class GuestBook {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int guestBookId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    private Member toMember;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @Column(length = 140)
    private String content;

    @CreationTimestamp
    private LocalDateTime createdTime;

    @ColumnDefault("false")
    private Boolean isDeleted;

}

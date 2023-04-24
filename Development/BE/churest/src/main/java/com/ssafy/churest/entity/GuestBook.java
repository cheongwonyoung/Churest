package com.ssafy.churest.entity;

import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
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

    @Builder
    private GuestBook(Member toMember, Member fromMember, String content) {
        this.toMember = toMember;
        this.fromMember = fromMember;
        this.content = content;
    }

    public GuestBook updateContent(String content){
        this.content = content;
        return this;
    }

    public GuestBook updateIsDeleted(Boolean isDeleted){
        this.isDeleted = isDeleted;
        return this;
    }
}

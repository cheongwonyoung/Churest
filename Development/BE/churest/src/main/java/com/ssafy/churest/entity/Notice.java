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
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int noticeId;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    private Member toMember;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @NotNull
    @ColumnDefault("false")
    private Boolean isChecked;

    private String content;

    @CreationTimestamp
    private LocalDateTime date;

    @Builder
    public Notice(Member toMember, Member fromMember, Boolean isChecked, String content){
        this.toMember = toMember;
        this.fromMember = fromMember;
        this.isChecked = isChecked;
        this.content = content;
    }


}

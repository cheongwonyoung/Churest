package com.ssafy.churest.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;


@Entity
@Getter
@NoArgsConstructor
@DynamicInsert
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @Column(length = 45)
    private String email;

    @Column(length = 6)
    private String nickname;

    private String file;

    private String token;

    @ColumnDefault("0")
    private int coin;

    private int avatarId;

//    @OneToMany(mappedBy = "member")
//    private List<Board> boards = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<Notification> notifications = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<GuestBook> guestBooks = new ArrayList<>();
//
//    @OneToMany(mappedBy = "member")
//    private List<Tag> tags = new ArrayList<>();

    public Member updateCoin(int coin){
        this.coin = coin;
        return this;
    }

    public Member updateNickname(String nickname){
        this.nickname = nickname;
        return this;
    }

    public Member updateAvatar(int avatarId){
        this.avatarId = avatarId;
        return this;
    }
}

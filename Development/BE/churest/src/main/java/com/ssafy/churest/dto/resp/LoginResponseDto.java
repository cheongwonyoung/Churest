package com.ssafy.churest.dto.resp;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LoginResponseDto {
    private int memberId;

    private String email;

    private String nickname;

    private String file;

    private String refreshToken;

    private int coin;

    private int avatarId;
    private String accessToken;

    @Builder
    public LoginResponseDto(int memberId, String email, String nickname, String file, String refreshToken, int coin, int avatarId, String accessToken){
        this.memberId = memberId;
        this.email = email;
        this.nickname = nickname;
        this.file = file;
        this.refreshToken = refreshToken;
        this.coin = coin;
        this.avatarId = avatarId;
        this.accessToken = accessToken;
    }
}

package com.ssafy.churest.dto.resp;

import java.util.Map;

public class KakaoMemberResponseDto {
    private Map<String, Object> attributes;





    public KakaoMemberResponseDto(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    public String getProviderId() {
        return String.valueOf(attributes.get("id"));
    }

    public String getProvider() {
        return "kakao";
    }

    public String getEmail() {
        return (String) getKakaoAccount().get("email");
    }

    public String getNickName() {
        return (String) getProfile().get("nickname");
    }

    public String getImageUrl() {
        return (String)getProfile().get("profile_image_url");
    }

    public Map<String, Object> getKakaoAccount(){
        return(Map<String, Object>) attributes.get("kakao_account");
    }

    public Map<String, Object> getProfile(){
        return (Map<String, Object>) getKakaoAccount().get("profile");
    }
}

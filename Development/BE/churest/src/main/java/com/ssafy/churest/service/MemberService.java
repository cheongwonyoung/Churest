package com.ssafy.churest.service;

import com.ssafy.churest.dto.resp.MemberResponseDto;
import org.springframework.stereotype.Service;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.churest.dto.req.MemberRequestDto;
import com.ssafy.churest.dto.resp.LoginResponseDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.entity.Member;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.util.MultiValueMap;

import java.util.Map;
    @Service
    public interface MemberService {
    List<MemberResponseDto.FriendSearchInfo> getSearchMemberList(String nickname, int memberId);

    LoginResponseDto login(String code) throws JsonProcessingException;
    JsonNode getToken(String code, ClientRegistration provider) throws JsonProcessingException;
    MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider);

    Member getMemberProfile(JsonNode tokenResponse, ClientRegistration provider);

    Map<String, Object> getMemberAttributes(ClientRegistration provider, JsonNode tokenResponse);

    MemberResponseDto.MemberInfo join(MemberRequestDto.Join joinInfo);

}

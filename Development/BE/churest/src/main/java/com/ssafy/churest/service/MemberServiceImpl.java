package com.ssafy.churest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.dto.req.MemberRequestDto;
import com.ssafy.churest.dto.resp.KakaoMemberResponseDto;
import com.ssafy.churest.dto.resp.LoginResponseDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.entity.Member;
import com.ssafy.churest.entity.MemberBird;
import com.ssafy.churest.repository.BirdRepository;
import com.ssafy.churest.repository.MemberBirdRepository;
import com.ssafy.churest.repository.MemberRepository;
import com.ssafy.churest.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Map;

@Service("MemberService")
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements  MemberService{
    private final BirdRepository birdRepository;
    private final MemberBirdRepository memberBirdRepository;

    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public LoginResponseDto login(String code) throws JsonProcessingException {
        ClientRegistration provider = inMemoryRepository.findByRegistrationId("kakao");
        log.info("provider clientName = " + provider.getClientName());
        log.info("redirect_uri = " + provider.getRedirectUri());
        log.info("client_secret = " + provider.getClientSecret());
        log.info("client_id = " + provider.getClientId());
        log.info("token_uri = " + provider.getProviderDetails().getTokenUri());

        JsonNode tokenResponse = getToken(code, provider);

        Member member = getMemberProfile(tokenResponse, provider);

        String accessToken = jwtTokenProvider.createAccessToken(String.valueOf(member.getMemberId()));
        String refreshToken = jwtTokenProvider.createRefreshToken();

        member.updateToken(refreshToken);
        memberRepository.save(member);
        return LoginResponseDto.builder()
                .memberId(member.getMemberId())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .refreshToken(refreshToken)
                .coin(member.getCoin())
                .avatarId(member.getAvatarId())
                .accessToken(accessToken)
                .build();

    }

    @Override
    public JsonNode getToken(String code, ClientRegistration provider) throws JsonProcessingException {
        log.info(provider.getProviderDetails().getTokenUri());

        // HTTP Header 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // HTTP Body 생성
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", provider.getClientId());
        body.add("redirect_uri", provider.getRedirectUri());
        body.add("code", code);

        // HTTP 요청 보내기
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // HTTP 응답 (JSON) -> 액세스 토큰 파싱
        String responseBody = response.getBody();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(responseBody);

        log.info(jsonNode.toString());
        log.info(jsonNode.get("access_token").asText());

        return jsonNode;
    }

    @Override
    public MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider) {
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("code", code);
        formData.add("grant_type", "authorization_code");
        formData.add("redirect_uri", provider.getRedirectUri());
        formData.add("client_secret", provider.getClientSecret());
        formData.add("client_id", provider.getClientId());
        return formData;
    }

    @Override
    public Member getMemberProfile(JsonNode tokenResponse, ClientRegistration provider) {
        Map<String, Object> userAttributes = getMemberAttributes(provider, tokenResponse);
        KakaoMemberResponseDto kakaoInfo = new KakaoMemberResponseDto(userAttributes);

        String email = kakaoInfo.getEmail();

        Member member = memberRepository.findByEmail(email);

        if(member == null){
            log.info("member is null");
            log.info("email = " + email);
            member = new Member();
            member = member.updateEmail(email);
        }

        return member;
    }

    @Override
    public Map<String, Object> getMemberAttributes(ClientRegistration provider, JsonNode tokenResponse) {
        return WebClient.create()
                .get()
                .uri(provider.getProviderDetails().getUserInfoEndpoint().getUri())
                .headers(header -> header.setBearerAuth(String.valueOf(tokenResponse.get("access_token").asText())))
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

    @Override
    public MemberResponseDto.MemberInfo join(MemberRequestDto.Join joinInfo) {

        Member member = memberRepository.findByEmail(joinInfo.getEmail());

        // memberBird 저장
        MemberBird memberBird = new MemberBird(member, birdRepository.findById(joinInfo.getBirdId()).get(),joinInfo.getBirdNickname(),true);
        memberBirdRepository.save(memberBird);

        // 회원가입(아바타id, 닉네임)
        member.setAvatarId(joinInfo.getAvatarId());
        member.setNickname(joinInfo.getNickname());
        MemberResponseDto.MemberInfo memberInfo = MemberResponseDto.MemberInfo.fromEntity(memberRepository.save(member));

        return memberInfo;
    }


}

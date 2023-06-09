package com.ssafy.churest.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.churest.dto.req.MemberBirdRequestDto;
import com.ssafy.churest.dto.req.MemberRequestDto;
import com.ssafy.churest.dto.resp.KakaoMemberResponseDto;
import com.ssafy.churest.dto.resp.LoginResponseDto;
import com.ssafy.churest.dto.resp.MemberResponseDto;
import com.ssafy.churest.entity.*;
import com.ssafy.churest.repository.*;
import com.ssafy.churest.util.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationToken;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.core.OAuth2Token;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationResponse;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service("MemberService")
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements  MemberService{
    private final MemberBirdHouseRepository memberBirdHouseRepository;
    private final BirdHouseRepository birdHouseRepository;
    private final MemberHouseRepository memberHouseRepository;
    private final BirdRepository birdRepository;
    private final MemberBirdRepository memberBirdRepository;

    private final InMemoryClientRegistrationRepository inMemoryRepository;
    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    private final HouseRepository houseRepository;

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

        String accessToken = jwtTokenProvider.createToken(member.getEmail(), "access");
        String refreshToken = jwtTokenProvider.createToken(member.getEmail(), "refresh");

        member.updateToken(refreshToken);
        memberRepository.save(member);

        // memberHouse 저장
        if(!memberHouseRepository.existsByMember_MemberId(member.getMemberId())){
            // 기본 집
            House defaultHouse = houseRepository.findById(1).get();
            memberHouseRepository.save(MemberHouse.builder().house(defaultHouse).member(member).build().updateIsUsed(true));
            // 기본 새
            MemberBird memberBird = new MemberBird(member, birdRepository.findById(1).get(),"기본새",true);
            memberBirdRepository.save(memberBird);
            // 기본 새집
            MemberBirdHouse memberBirdHouse = new MemberBirdHouse(member, birdHouseRepository.findById(1).get());
            memberBirdHouse.updateIsUsed(true);
            memberBirdHouseRepository.save(memberBirdHouse);
        }

        // memberBird 저장
//        if(!memberBirdRepository.existsByMember_MemberId(member.getMemberId())){
//            MemberBird memberBird = new MemberBird(member, birdRepository.findById(1).get(),"기본새",true);
//            memberBirdRepository.save(memberBird);
//        }

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
        return WebClient.create()
                .post()
                .uri(provider.getProviderDetails().getTokenUri())
                .header("Content-type","application/x-www-form-urlencoded;charset=utf-8" ) //요청 헤더
                .bodyValue(tokenRequest(code, provider))
                .retrieve()
                .bodyToMono(JsonNode.class)
                .block();
    }

    @Override
    public MultiValueMap<String, String> tokenRequest(String code, ClientRegistration provider) {
        // HTTP Body 생성
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

        Member member = memberRepository.findByMemberId(joinInfo.getMemberId());

        // memberBird 저장
        // memberId로 memberBird 찾아옴
        MemberBird memberBird = memberBirdRepository.findByMember_MemberIdAndIsUsedIsTrue(joinInfo.getMemberId());
        memberBird.setBird(birdRepository.findById(joinInfo.getBirdId()).get());
        memberBird.setNickname(joinInfo.getBirdNickname());
        memberBirdRepository.save(memberBird);

        // 회원가입(아바타id, 닉네임)
        member.setAvatarId(joinInfo.getAvatarId());
        member.setNickname(joinInfo.getNickname());
        member.setFcmToken(joinInfo.getFcmToken());
        MemberResponseDto.MemberInfo memberInfo = MemberResponseDto.MemberInfo.fromEntity(memberRepository.save(member));

        return memberInfo;
    }

    @Override
    public String token(String refreshToken) {
//        access token 재발급
//                - refresh token 받기
//        - 유효한지 확인
//                - 유효하지 않다면 401 반환 ( 재로그인 필요 )
//                - 유효하다면 db에 있는 값과 같은지 확인하고 같으면 access token 생성 후 발급

        Member member = memberRepository.findByToken(refreshToken);
        // 프론트가 보낸 refreshtoken이 db에 존재한다면
        if(member != null){
            // 프론트가 보낸 refreshtoken이 유효하다면
            if(jwtTokenProvider.validateToken(refreshToken)){
                // access token 재발급
                return jwtTokenProvider.createToken(member.getEmail(), "access");
            }

        }
        new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        return null;
    }

    @Override
    public Boolean checkAvatar(String nickname) {
        // member 테이블의 nickname에서 확인
        return memberRepository.existsByNickname(nickname);
    }


    @Override
    public List<MemberResponseDto.FriendSearchInfo> getSearchMemberList(String nickname, int memberId) {
        return memberRepository.findAllByNicknameContainingAndMemberIdIsNot(nickname, memberId).stream().map(MemberResponseDto.FriendSearchInfo::fromEntity).collect(Collectors.toList());
    }




    @Override
    public void updateFcm(String fcm, int memberId){

        Member member = memberRepository.findByMemberId(memberId);

        member.setFcmToken(fcm);
        memberRepository.save(member);

    }
}

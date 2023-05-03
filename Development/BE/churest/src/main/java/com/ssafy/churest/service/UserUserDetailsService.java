package com.ssafy.churest.service;

import com.ssafy.churest.entity.Member;
import com.ssafy.churest.repository.MemberRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;
    public UserUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    //
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        Member member = memberRepository.findByEmail(email);
        if(member==null){
            throw new UsernameNotFoundException(email + "email존재 안함");
        }

        return User.builder()
                .username(member.getEmail())
                .password("123")
                .roles("")
                .build();

    }
}
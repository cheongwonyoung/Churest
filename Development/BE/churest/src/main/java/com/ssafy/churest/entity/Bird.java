package com.ssafy.churest.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Bird {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int birdId;

    @Column(length = 6)
    private String name;

    private String description;

    private int price;

    @Builder
    private Bird(String name, String description, int price){
        this.name = name;
        this.description = description;
        this.price = price;
    }
}

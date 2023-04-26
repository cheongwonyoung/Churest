package com.ssafy.churest.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int houseId;

    @Column(length = 10)
    private String name;

    private String description;

    private int price;
}
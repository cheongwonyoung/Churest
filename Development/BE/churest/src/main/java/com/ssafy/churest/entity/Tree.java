package com.ssafy.churest.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Tree {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int treeId;

    @Column(length = 20)
    private String name;

    private String description;

    private String file;

    @Builder
    public Tree(String name, String description, String file){
        this.name = name;
        this.description = description;
        this.file = file;
    }

}

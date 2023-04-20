package com.ssafy.churest.repository;

import com.ssafy.churest.entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TreeRepository extends JpaRepository<Tree, Integer> {
    Tree findByTreeId(int treeId);
}

package com.ssafy.alpaca.db.repository;

import com.ssafy.alpaca.db.document.Problem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProblemRepository extends MongoRepository<Problem,String> {

    List<Problem> findTop10ByNumberStartingWithOrderByNumberAsc(Long searchWord);

    Problem findByNumber(Long number);

}

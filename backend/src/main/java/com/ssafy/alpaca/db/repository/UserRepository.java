package com.ssafy.alpaca.db.repository;

import com.ssafy.alpaca.db.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByNickname(String nickname);

    Boolean existsByBojId(String bojId);

    List<User> findAllByNicknameContains(String nickname);
}
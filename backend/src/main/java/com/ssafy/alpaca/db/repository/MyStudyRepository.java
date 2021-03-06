package com.ssafy.alpaca.db.repository;

import com.ssafy.alpaca.db.entity.MyStudy;
import com.ssafy.alpaca.db.entity.Study;
import com.ssafy.alpaca.db.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MyStudyRepository extends JpaRepository<MyStudy, Long> {

    Long countAllByUser(User user);

    @EntityGraph(attributePaths = {"study"})
    List<MyStudy> findAllByUserOrderByPinnedTimeDesc(User user);

    Boolean existsByUserAndIsRoomMaker(User user, Boolean isRoomMaker);

    Boolean existsByUserAndStudy(User user, Study study);

    Optional<MyStudy> findByUserAndStudy(User user, Study study);

    Boolean existsByUserAndStudyAndIsRoomMaker(User user, Study study, Boolean check);

    @EntityGraph(attributePaths = {"user"})
    MyStudy findTopByStudyAndIsRoomMaker(Study study, Boolean isRoomMaker);

    @EntityGraph(attributePaths = {"user"})
    List<MyStudy> findAllByStudy(Study study);

    @EntityGraph(attributePaths = {"user"})
    List<MyStudy> findTop4ByStudy(Study study);

    @Query(name = "find_schedule_list_by_user_id", nativeQuery = true, value = "" +
            "SELECT sc.id as id, st.id as studyId, st.title as title, sc.started_at as startedAt, sc.finished_at as finishedAt " +
            "FROM my_study as ms " +
            "INNER JOIN study as st ON ms.study_id = st.id " +
            "INNER JOIN schedule as sc ON sc.study_id = st.id " +
            "WHERE ms.user_id=:userId " +
            "AND sc.started_at BETWEEN :startedAt AND :finishedAt " +
            "ORDER BY sc.started_at")
    List<Object[]> findScheduleListByUserId(
            @Param("userId")Long userId,
            @Param("startedAt") OffsetDateTime startedAt,
            @Param("finishedAt")OffsetDateTime finishedAt);

}

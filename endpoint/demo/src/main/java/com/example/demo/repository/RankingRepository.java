package com.example.demo.repository;

import com.example.demo.model.Ranking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface RankingRepository extends JpaRepository<Ranking, Integer> {
    @Query("SELECT r FROM Ranking r ORDER BY r.promedioFinal DESC")
    List<Ranking> findAllOrderByPromedio();
}
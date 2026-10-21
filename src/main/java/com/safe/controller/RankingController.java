package com.safe.controller;

import com.safe.service.RankingService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/ranking")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getRanking() {
        Map<String, Object> response = new HashMap<>();

        response.put("status", "ok");
        response.put("data", rankingService.calcularRanking());
        response.put("message", "Ranking calculado correctamente");
        return ResponseEntity.ok(response);
    }
}

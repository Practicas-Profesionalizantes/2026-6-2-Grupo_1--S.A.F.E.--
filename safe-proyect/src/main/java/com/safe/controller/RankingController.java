package com.safe.controller;

import com.safe.repository.RankingRepository;
import com.safe.model.RankingModel;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/ranking")
public class RankingController {

    @Autowired
    private RankingRepository RankingRepository;

    @GetMapping
    public Map<String, Object> getRanking() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<RankingModel> listaRanking = RankingRepository.findAllOrderByPromedio();
            
            response.put("status", "ok");
            response.put("data", listaRanking);
            response.put("message", "Ranking generado correctamente");
            
        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error al obtener el ranking: " + e.getMessage());
        }
        return response;
    }
}
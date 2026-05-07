package com.example.demo;

import com.example.demo.model.Ranking;
import com.example.demo.repository.RankingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@RestController
@RequestMapping("/ranking")
public class endpoint {

    @Autowired
    private RankingRepository rankingRepository;

    @GetMapping
    public Map<String, Object> getRanking() {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Ranking> listaRanking = rankingRepository.findAllOrderByPromedio();
            
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
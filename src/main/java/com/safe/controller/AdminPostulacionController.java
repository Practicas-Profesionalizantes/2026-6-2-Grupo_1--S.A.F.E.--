package com.safe.controller;

import com.safe.dto.PostulacionResponseDTO;
import com.safe.service.PostulacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/postulaciones")
public class AdminPostulacionController {

    private final PostulacionService postulacionService;

    public AdminPostulacionController(PostulacionService postulacionService) {
        this.postulacionService = postulacionService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> listarTodas() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Postulaciones listadas correctamente",
                "data", postulacionService.listarTodas()
                        .stream()
                        .map(PostulacionResponseDTO::new)
                        .toList()
        ));
    }
}

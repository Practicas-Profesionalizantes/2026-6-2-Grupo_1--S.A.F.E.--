package com.safe.controller;

import com.safe.dto.PostulanteResponseDTO;
import com.safe.service.PostulanteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/postulantes")
public class AdminPostulanteController {

    private final PostulanteService postulanteService;

    public AdminPostulanteController(PostulanteService postulanteService) {
        this.postulanteService = postulanteService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> listar() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Postulantes listados correctamente",
                "data", postulanteService.listar()
                        .stream()
                        .map(PostulanteResponseDTO::new)
                        .toList()
        ));
    }
}

package com.safe.controller;

import com.safe.service.HistorialPostulanteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/postulantes")
public class HistorialPostulanteController {

    private final HistorialPostulanteService historialPostulanteService;

    public HistorialPostulanteController(HistorialPostulanteService historialPostulanteService) {
        this.historialPostulanteService = historialPostulanteService;
    }

    @GetMapping("/{id}/historial")
    public ResponseEntity<Map<String, Object>> obtener(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Historial de postulante obtenido correctamente",
                "data", historialPostulanteService.obtener(id)
        ));
    }
}

package com.safe.controller;

import com.safe.dto.NotificacionResponseDTO;
import com.safe.service.NotificacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/notificaciones")
public class NotificacionController {

    private final NotificacionService notificacionService;

    public NotificacionController(NotificacionService notificacionService) {
        this.notificacionService = notificacionService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> listarTodas() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Notificaciones listadas correctamente",
                "data", notificacionService.listarTodas()
                        .stream()
                        .map(NotificacionResponseDTO::new)
                        .toList()
        ));
    }

    @GetMapping("/postulante/{idPostulante}")
    public ResponseEntity<Map<String, Object>> listarPorPostulante(@PathVariable Long idPostulante) {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Notificaciones del postulante listadas correctamente",
                "data", notificacionService.listarPorPostulante(idPostulante)
                        .stream()
                        .map(NotificacionResponseDTO::new)
                        .toList()
        ));
    }
}

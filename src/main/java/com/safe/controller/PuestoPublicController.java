package com.safe.controller;

import com.safe.dto.PuestoResponseDTO;
import com.safe.service.PuestoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class PuestoPublicController {

    private final PuestoService puestoService;

    public PuestoPublicController(PuestoService puestoService) {
        this.puestoService = puestoService;
    }

    @GetMapping("/puestos")
    public ResponseEntity<Map<String, Object>> listar() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Puestos listados correctamente",
                "data", puestoService.listar()
                        .stream()
                        .map(PuestoResponseDTO::new)
                        .toList()
        ));
    }

    @GetMapping("/puestos/{id}")
    public ResponseEntity<Map<String, Object>> detalle(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Detalle del puesto obtenido correctamente",
                "data", new PuestoResponseDTO(puestoService.obtenerDetalle(id))
        ));
    }
}

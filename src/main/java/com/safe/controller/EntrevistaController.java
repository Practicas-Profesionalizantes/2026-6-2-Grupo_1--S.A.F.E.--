package com.safe.controller;

import com.safe.dto.EntrevistaRequestDTO;
import com.safe.dto.EntrevistaResponseDTO;
import com.safe.service.EntrevistaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/entrevistas")
public class EntrevistaController {

    private final EntrevistaService entrevistaService;

    public EntrevistaController(EntrevistaService entrevistaService) {
        this.entrevistaService = entrevistaService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> listar() {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Entrevistas listadas correctamente",
                "data", entrevistaService.listarTodas()
                        .stream()
                        .map(EntrevistaResponseDTO::new)
                        .toList()
        ));
    }

    @GetMapping("/postulante/{idPostulante}")
    public ResponseEntity<Map<String, Object>> listarPorPostulante(@PathVariable Long idPostulante) {
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Entrevistas del postulante listadas correctamente",
                "data", entrevistaService.listarPorPostulante(idPostulante)
                        .stream()
                        .map(EntrevistaResponseDTO::new)
                        .toList()
        ));
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> crear(@RequestBody EntrevistaRequestDTO dto) {
        try {
            return new ResponseEntity<>(Map.of(
                    "status", "ok",
                    "message", "Entrevista creada correctamente",
                    "data", new EntrevistaResponseDTO(entrevistaService.crear(dto))
            ), HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("status", "error", "message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> actualizar(
            @PathVariable Long id,
            @RequestBody EntrevistaRequestDTO dto) {
        try {
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Entrevista actualizada correctamente",
                    "data", new EntrevistaResponseDTO(entrevistaService.actualizar(id, dto))
            ));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("status", "error", "message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @PatchMapping("/{id}/estado")
    public ResponseEntity<Map<String, Object>> cambiarEstado(
            @PathVariable Long id,
            @RequestBody EntrevistaRequestDTO dto) {
        try {
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Estado de entrevista actualizado correctamente",
                    "data", new EntrevistaResponseDTO(
                            entrevistaService.cambiarEstado(id, dto.getEstado(), dto.getResultado())
                    )
            ));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of("status", "error", "message", e.getMessage()), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> eliminar(@PathVariable Long id) {
        entrevistaService.eliminar(id);
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Entrevista eliminada correctamente"
        ));
    }
}

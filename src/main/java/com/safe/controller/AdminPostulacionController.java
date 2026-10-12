package com.safe.controller;

import com.safe.dto.PostulacionDecisionRequestDTO;
import com.safe.dto.PostulacionResponseDTO;
import com.safe.model.PostulacionModel;
import com.safe.service.PostulacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

    @PatchMapping("/{idPostulante}/{idPuesto}/decision")
    public ResponseEntity<Map<String, Object>> registrarDecision(
            @PathVariable Long idPostulante,
            @PathVariable Long idPuesto,
            @RequestBody PostulacionDecisionRequestDTO dto) {

        PostulacionModel postulacion = postulacionService.registrarDecisionRrhh(
                idPostulante,
                idPuesto,
                dto.getCumple(),
                dto.getObservacion()
        );

        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Decision de RRHH registrada correctamente",
                "data", new PostulacionResponseDTO(postulacion)
        ));
    }
}

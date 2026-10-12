package com.safe.controller;

import com.safe.dto.EntregaEvaluacionRequestDTO;
import com.safe.dto.PreguntaRendirResponseDTO;
import com.safe.dto.RespuestaEvaluacionResponseDTO;
import com.safe.service.RespuestaEvaluacionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/postulante/evaluaciones/asignadas")
public class RespuestaEvaluacionController {

    private final RespuestaEvaluacionService respuestaEvaluacionService;

    public RespuestaEvaluacionController(RespuestaEvaluacionService respuestaEvaluacionService) {
        this.respuestaEvaluacionService = respuestaEvaluacionService;
    }

    @GetMapping("/{idAsignacion}/preguntas")
    public ResponseEntity<Map<String, Object>> listarPreguntas(
            @PathVariable Long idAsignacion,
            Authentication authentication) {

        try {
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Preguntas de evaluacion listadas correctamente",
                    "data", respuestaEvaluacionService
                            .listarPreguntasParaRendir(idAsignacion, authentication.getName())
                            .stream()
                            .map(PreguntaRendirResponseDTO::new)
                            .toList()
            ));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{idAsignacion}/respuestas")
    public ResponseEntity<Map<String, Object>> guardarRespuestas(
            @PathVariable Long idAsignacion,
            @RequestBody EntregaEvaluacionRequestDTO dto,
            Authentication authentication) {

        try {
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Respuestas guardadas correctamente",
                    "data", respuestaEvaluacionService
                            .guardarRespuestas(idAsignacion, authentication.getName(), dto)
                            .stream()
                            .map(RespuestaEvaluacionResponseDTO::new)
                            .toList()
            ));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ), HttpStatus.NOT_FOUND);
        }
    }
}

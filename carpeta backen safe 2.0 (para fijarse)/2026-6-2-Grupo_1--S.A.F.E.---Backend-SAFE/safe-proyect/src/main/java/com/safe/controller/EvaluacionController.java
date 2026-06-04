package com.safe.controller;

import com.safe.dto.EvaluacionRequestDTO;
import com.safe.model.EvaluacionModel;
import com.safe.service.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/evaluaciones")
public class EvaluacionController {

    @Autowired
    private EvaluacionService evaluacionService;

    @PutMapping("/editar/{id}")
    public ResponseEntity<Map<String, Object>> editarEvaluacion(
            @PathVariable Integer id, 
            @RequestBody EvaluacionRequestDTO dto) {
        
        Map<String, Object> response = new HashMap<>();
        Optional<EvaluacionModel> evaluacionEditada = evaluacionService.editarEvaluacion(id, dto);

        if (evaluacionEditada.isPresent()) {
            response.put("status", "ok"); [cite: 69]
            response.put("data", evaluacionEditada.get()); [cite: 70]
            response.put("message", "Evaluación actualizada correctamente."); [cite: 71]
            return ResponseEntity.ok(response);
        } else {
            response.put("status", "error"); [cite: 74]
            response.put("message", "No se encontró la evaluación con el ID proporcionado: " + id); [cite: 76]
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
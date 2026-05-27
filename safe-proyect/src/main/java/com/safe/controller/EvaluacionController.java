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

@RestController
@RequestMapping("/evaluaciones")
public class EvaluacionController {

    @Autowired
    private EvaluacionService evaluacionService;

    @PostMapping("/crear")
    public ResponseEntity<Map<String, Object>> crearEvaluacion(@RequestBody EvaluacionRequestDTO requestDTO) {
        Map<String, Object> response = new HashMap<>();
        try {
            // Validaciones básicas de negocio según formato SAFE
            if (requestDTO.getTipo() == null || requestDTO.getTipo().isEmpty()) {
                response.put("status", "error");
                response.put("message", "El tipo de evaluación es obligatorio.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            EvaluacionModel nuevaEvaluacion = evaluacionService.crearEvaluacion(requestDTO);

            // Estructura de respuesta Exitosa requerida por el formato SAFE
            response.put("status", "ok");
            response.put("data", nuevaEvaluacion);
            response.put("message", "Evaluación creada correctamente.");
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            // Estructura de respuesta de Error requerida por el formato SAFE
            response.put("status", "error");
            response.put("message", "Error al crear la evaluación: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
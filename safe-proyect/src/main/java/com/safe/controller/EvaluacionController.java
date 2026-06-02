package com.safe.controller;

import com.safe.dto.EvaluacionRequestDTO;
import com.safe.dto.EvaluacionResponseDTO;
import com.safe.model.EvaluacionModel;
import com.safe.service.EvaluacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            if (requestDTO.getTipo() == null || requestDTO.getTipo().isEmpty()) {
                response.put("status", "error");
                response.put("message", "El tipo de evaluacion es obligatorio.");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }

            EvaluacionModel nuevaEvaluacion = evaluacionService.crearEvaluacion(requestDTO);

            response.put("status", "ok");
            response.put("data", new EvaluacionResponseDTO(nuevaEvaluacion));
            response.put("message", "Evaluacion creada correctamente.");

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            response.put("status", "error");
            response.put("message", "Error al crear la evaluacion: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

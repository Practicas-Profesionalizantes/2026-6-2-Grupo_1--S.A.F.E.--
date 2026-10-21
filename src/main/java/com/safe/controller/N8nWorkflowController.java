package com.safe.controller;

import com.safe.dto.NotificacionWorkflowDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.service.EvaluacionAsignadaService;
import com.safe.service.N8nWorkflowService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/admin/workflows/n8n")
public class N8nWorkflowController {

    private final EvaluacionAsignadaService evaluacionAsignadaService;
    private final N8nWorkflowService n8nWorkflowService;

    public N8nWorkflowController(
            EvaluacionAsignadaService evaluacionAsignadaService,
            N8nWorkflowService n8nWorkflowService) {
        this.evaluacionAsignadaService = evaluacionAsignadaService;
        this.n8nWorkflowService = n8nWorkflowService;
    }

    @PostMapping("/correccion-evaluacion/{idAsignacion}")
    public ResponseEntity<Map<String, Object>> enviarCorreccionEvaluacion(@PathVariable Long idAsignacion) {
        EvaluacionAsignadaModel asignacion = evaluacionAsignadaService.obtenerPorId(idAsignacion);
        boolean enviado = n8nWorkflowService.enviarCorreccionEvaluacion(asignacion);

        return ResponseEntity.ok(Map.of(
                "status", enviado ? "ok" : "warning",
                "message", enviado ? "Workflow de correccion enviado a n8n" : "Webhook de correccion no configurado o no disponible"
        ));
    }

    @PostMapping("/notificacion")
    public ResponseEntity<Map<String, Object>> enviarNotificacion(@RequestBody NotificacionWorkflowDTO dto) {
        boolean enviado = n8nWorkflowService.enviarNotificacion(dto);

        return ResponseEntity.ok(Map.of(
                "status", enviado ? "ok" : "warning",
                "message", enviado ? "Workflow de notificacion enviado a n8n" : "Webhook de notificacion no configurado o no disponible"
        ));
    }
}

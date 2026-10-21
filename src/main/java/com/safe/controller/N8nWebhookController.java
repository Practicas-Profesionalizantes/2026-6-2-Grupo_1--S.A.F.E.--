package com.safe.controller;

import com.safe.dto.AnalisisCvResultadoDTO;
import com.safe.dto.CorreccionEvaluacionResultadoDTO;
import com.safe.dto.EvaluacionAsignadaResponseDTO;
import com.safe.dto.NotificacionResponseDTO;
import com.safe.dto.NotificacionWorkflowDTO;
import com.safe.dto.PostulacionResponseDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.NotificacionModel;
import com.safe.model.PostulacionModel;
import com.safe.service.EvaluacionAsignadaService;
import com.safe.service.NotificacionService;
import com.safe.service.PostulacionService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/webhooks/n8n")
public class N8nWebhookController {

    private final PostulacionService postulacionService;
    private final EvaluacionAsignadaService evaluacionAsignadaService;
    private final NotificacionService notificacionService;
    private final String webhookSecret;

    public N8nWebhookController(
            PostulacionService postulacionService,
            EvaluacionAsignadaService evaluacionAsignadaService,
            NotificacionService notificacionService,
            @Value("${n8n.webhook.result-secret:}") String webhookSecret) {
        this.postulacionService = postulacionService;
        this.evaluacionAsignadaService = evaluacionAsignadaService;
        this.notificacionService = notificacionService;
        this.webhookSecret = webhookSecret;
    }

    @PostMapping("/analisis-cv")
    public ResponseEntity<Map<String, Object>> recibirResultadoAnalisisCv(
            @RequestBody AnalisisCvResultadoDTO dto,
            @RequestHeader(value = "X-SAFE-WEBHOOK-SECRET", required = false) String receivedSecret) {

        ResponseEntity<Map<String, Object>> unauthorized = validarSecret(receivedSecret);
        if (unauthorized != null) return unauthorized;

        PostulacionModel postulacion = postulacionService.actualizarResultadoAnalisisCv(dto);
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Resultado de analisis CV recibido correctamente",
                "data", new PostulacionResponseDTO(postulacion)
        ));
    }

    @PostMapping("/correccion-evaluacion")
    public ResponseEntity<Map<String, Object>> recibirResultadoCorreccionEvaluacion(
            @RequestBody CorreccionEvaluacionResultadoDTO dto,
            @RequestHeader(value = "X-SAFE-WEBHOOK-SECRET", required = false) String receivedSecret) {

        ResponseEntity<Map<String, Object>> unauthorized = validarSecret(receivedSecret);
        if (unauthorized != null) return unauthorized;

        if (dto.getIdAsignacion() == null) {
            return new ResponseEntity<>(Map.of(
                    "status", "error",
                    "message", "idAsignacion es obligatorio"
            ), HttpStatus.BAD_REQUEST);
        }

        EvaluacionAsignadaModel asignacion = evaluacionAsignadaService.registrarResultadoCorreccion(
                dto.getIdAsignacion(),
                dto.getPuntajeTotal(),
                dto.getAprobado(),
                dto.getObservacionesIa(),
                dto.getEstado()
        );

        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Resultado de correccion recibido correctamente",
                "data", new EvaluacionAsignadaResponseDTO(asignacion)
        ));
    }

    @PostMapping("/notificacion")
    public ResponseEntity<Map<String, Object>> recibirResultadoNotificacion(
            @RequestBody NotificacionWorkflowDTO dto,
            @RequestHeader(value = "X-SAFE-WEBHOOK-SECRET", required = false) String receivedSecret) {

        ResponseEntity<Map<String, Object>> unauthorized = validarSecret(receivedSecret);
        if (unauthorized != null) return unauthorized;

        NotificacionModel notificacion = notificacionService.registrar(dto);
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "message", "Notificacion registrada correctamente",
                "data", new NotificacionResponseDTO(notificacion)
        ));
    }

    private ResponseEntity<Map<String, Object>> validarSecret(String receivedSecret) {
        if (webhookSecret != null && !webhookSecret.isBlank() && !webhookSecret.equals(receivedSecret)) {
            return new ResponseEntity<>(Map.of(
                    "status", "error",
                    "message", "Webhook no autorizado"
            ), HttpStatus.UNAUTHORIZED);
        }

        return null;
    }
}

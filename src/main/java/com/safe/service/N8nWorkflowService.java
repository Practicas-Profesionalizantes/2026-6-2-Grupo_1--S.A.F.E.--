package com.safe.service;

import com.safe.dto.NotificacionWorkflowDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.PostulanteModel;
import com.safe.model.PreguntaModel;
import com.safe.model.RespuestaEvaluacionModel;
import com.safe.repository.PostulanteRepository;
import com.safe.repository.PreguntaRepository;
import com.safe.repository.RespuestaEvaluacionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class N8nWorkflowService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final PreguntaRepository preguntaRepository;
    private final RespuestaEvaluacionRepository respuestaEvaluacionRepository;
    private final PostulanteRepository postulanteRepository;
    private final String publicBaseUrl;
    private final String analisisCvUrl;
    private final String correccionEvaluacionUrl;
    private final String notificacionUrl;

    public N8nWorkflowService(
            PreguntaRepository preguntaRepository,
            RespuestaEvaluacionRepository respuestaEvaluacionRepository,
            PostulanteRepository postulanteRepository,
            @Value("${safe.api.public-base-url:http://localhost:8080}") String publicBaseUrl,
            @Value("${n8n.webhook.analisis-cv-url:}") String analisisCvUrl,
            @Value("${n8n.webhook.correccion-evaluacion-url:}") String correccionEvaluacionUrl,
            @Value("${n8n.webhook.notificacion-url:}") String notificacionUrl) {
        this.preguntaRepository = preguntaRepository;
        this.respuestaEvaluacionRepository = respuestaEvaluacionRepository;
        this.postulanteRepository = postulanteRepository;
        this.publicBaseUrl = publicBaseUrl;
        this.analisisCvUrl = analisisCvUrl;
        this.correccionEvaluacionUrl = correccionEvaluacionUrl;
        this.notificacionUrl = notificacionUrl;
    }

    public boolean enviarAnalisisCv(PostulanteModel postulante, com.safe.model.PuestoModel puesto) {
        if (estaVacia(analisisCvUrl)) {
            System.err.println("Webhook n8n no configurado: n8n.webhook.analisis-cv-url");
            return false;
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("evento", "ANALISIS_CV");
        payload.put("callbackUrl", publicBaseUrl + "/webhooks/n8n/analisis-cv");

        Map<String, Object> datosPuesto = new HashMap<>();
        datosPuesto.put("id", puesto.getId());
        datosPuesto.put("nombre", puesto.getNombrePuesto());
        datosPuesto.put("tipo", puesto.getTipo());
        datosPuesto.put("requisitos", puesto.getRequisitos());
        payload.put("puesto", datosPuesto);

        Map<String, Object> datosPostulante = new HashMap<>();
        datosPostulante.put("id", postulante.getId());
        if (postulante.getUsuario() != null) {
            datosPostulante.put("nombre", postulante.getUsuario().getNombre());
            datosPostulante.put("email", postulante.getUsuario().getEmail());
            datosPostulante.put("dni", postulante.getUsuario().getDni());
        }
        datosPostulante.put("experiencia", postulante.getExperienciaLaboral());
        datosPostulante.put("estudios", postulante.getEstudios());
        datosPostulante.put("cvUrl", construirUrlPublica(postulante.getCvUrl()));
        datosPostulante.put("cvTextoExtraido", postulante.getCvTextoExtraido());
        datosPostulante.put("cvProcesamientoEstado", postulante.getCvProcesamientoEstado());
        datosPostulante.put("telefono", postulante.getTelefono());
        datosPostulante.put("direccion", postulante.getDireccion());
        payload.put("postulante", datosPostulante);

        return enviar(analisisCvUrl, payload);
    }

    public boolean enviarCorreccionEvaluacion(EvaluacionAsignadaModel asignacion) {
        if (estaVacia(correccionEvaluacionUrl)) {
            System.err.println("Webhook n8n no configurado: n8n.webhook.correccion-evaluacion-url");
            return false;
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("evento", "CORRECCION_EVALUACION");
        payload.put("callbackUrl", publicBaseUrl + "/webhooks/n8n/correccion-evaluacion");
        payload.put("idAsignacion", asignacion.getId());

        Map<String, Object> evaluacion = new HashMap<>();
        evaluacion.put("id", asignacion.getEvaluacion().getId());
        evaluacion.put("nombre", asignacion.getEvaluacion().getNombre());
        evaluacion.put("tipo", asignacion.getEvaluacion().getTipo());
        evaluacion.put("puntajeMin", asignacion.getEvaluacion().getPuntajeMin());
        evaluacion.put("puntajeMax", asignacion.getEvaluacion().getPuntajeMax());
        payload.put("evaluacion", evaluacion);

        Map<String, Object> postulante = new HashMap<>();
        postulante.put("id", asignacion.getPostulante().getId());
        if (asignacion.getPostulante().getUsuario() != null) {
            postulante.put("nombre", asignacion.getPostulante().getUsuario().getNombre());
            postulante.put("email", asignacion.getPostulante().getUsuario().getEmail());
        }
        payload.put("postulante", postulante);

        Map<Long, String> respuestasPorPregunta = new HashMap<>();
        for (RespuestaEvaluacionModel respuesta : respuestaEvaluacionRepository.findByAsignacionId(asignacion.getId())) {
            respuestasPorPregunta.put(respuesta.getPregunta().getId(), respuesta.getRespuesta());
        }

        List<Map<String, Object>> preguntas = preguntaRepository
                .findByEvaluacionIdOrderByIdAsc(asignacion.getEvaluacion().getId())
                .stream()
                .map(pregunta -> mapearPregunta(pregunta, respuestasPorPregunta))
                .toList();
        payload.put("preguntas", preguntas);

        return enviar(correccionEvaluacionUrl, payload);
    }

    public boolean enviarNotificacion(NotificacionWorkflowDTO dto) {
        if (estaVacia(notificacionUrl)) {
            System.err.println("Webhook n8n no configurado: n8n.webhook.notificacion-url");
            return false;
        }

        Map<String, Object> payload = new HashMap<>();
        payload.put("evento", "NOTIFICACION");
        payload.put("callbackUrl", publicBaseUrl + "/webhooks/n8n/notificacion");
        payload.put("notificacion", mapearNotificacion(dto));

        return enviar(notificacionUrl, payload);
    }

    private Map<String, Object> mapearPregunta(PreguntaModel pregunta, Map<Long, String> respuestasPorPregunta) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", pregunta.getId());
        data.put("pregunta", pregunta.getPregunta());
        data.put("tipo", pregunta.getTipo());
        data.put("respuestaCorrecta", pregunta.getRespuestaCorrecta());
        data.put("respuestaPostulante", respuestasPorPregunta.getOrDefault(pregunta.getId(), ""));
        data.put("peso", pregunta.getPeso());
        return data;
    }

    private Map<String, Object> mapearNotificacion(NotificacionWorkflowDTO dto) {
        Map<String, Object> data = new HashMap<>();
        data.put("idPostulante", dto.getIdPostulante());
        data.put("mensaje", dto.getMensaje());
        data.put("tipo", dto.getTipo());
        data.put("estado", dto.getEstado());
        data.put("detalle", dto.getDetalle());
        data.put("datos", dto.getDatos());

        String email = dto.getEmail();
        String nombre = dto.getNombre();

        if (dto.getIdPostulante() != null && (estaVacia(email) || estaVacia(nombre))) {
            PostulanteModel postulante = postulanteRepository.findById(dto.getIdPostulante()).orElse(null);
            if (postulante != null && postulante.getUsuario() != null) {
                if (estaVacia(email)) {
                    email = postulante.getUsuario().getEmail();
                }
                if (estaVacia(nombre)) {
                    nombre = postulante.getUsuario().getNombre();
                }
            }
        }

        data.put("email", email);
        data.put("nombre", nombre);
        return data;
    }

    private boolean enviar(String url, Map<String, Object> payload) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            restTemplate.postForEntity(url, new HttpEntity<>(payload, headers), String.class);
            return true;
        } catch (Exception e) {
            System.err.println("Error al enviar workflow a n8n: " + e.getMessage());
            return false;
        }
    }

    private boolean estaVacia(String value) {
        return value == null || value.isBlank();
    }

    private String construirUrlPublica(String value) {
        if (estaVacia(value)) {
            return value;
        }

        if (value.startsWith("http://") || value.startsWith("https://")) {
            return value;
        }

        String baseUrl = publicBaseUrl.endsWith("/")
                ? publicBaseUrl.substring(0, publicBaseUrl.length() - 1)
                : publicBaseUrl;
        String path = value.startsWith("/") ? value : "/" + value;

        return baseUrl + path;
    }
}

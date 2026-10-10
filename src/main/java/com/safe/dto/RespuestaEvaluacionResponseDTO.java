package com.safe.dto;

import com.safe.model.RespuestaEvaluacionModel;

import java.time.LocalDateTime;

public class RespuestaEvaluacionResponseDTO {

    private Long id;
    private Long idAsignacion;
    private Long idPregunta;
    private String pregunta;
    private String respuesta;
    private LocalDateTime fechaRespuesta;

    public RespuestaEvaluacionResponseDTO(RespuestaEvaluacionModel respuestaEvaluacion) {
        this.id = respuestaEvaluacion.getId();
        this.idAsignacion = respuestaEvaluacion.getAsignacion().getId();
        this.idPregunta = respuestaEvaluacion.getPregunta().getId();
        this.pregunta = respuestaEvaluacion.getPregunta().getPregunta();
        this.respuesta = respuestaEvaluacion.getRespuesta();
        this.fechaRespuesta = respuestaEvaluacion.getFechaRespuesta();
    }

    public Long getId() {
        return id;
    }

    public Long getIdAsignacion() {
        return idAsignacion;
    }

    public Long getIdPregunta() {
        return idPregunta;
    }

    public String getPregunta() {
        return pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public LocalDateTime getFechaRespuesta() {
        return fechaRespuesta;
    }
}

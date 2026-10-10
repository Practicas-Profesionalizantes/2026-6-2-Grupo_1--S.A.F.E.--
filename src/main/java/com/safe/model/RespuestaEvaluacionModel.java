package com.safe.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

@Entity
@Table(name = "respuesta_evaluacion")
public class RespuestaEvaluacionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_asignacion", nullable = false)
    private EvaluacionAsignadaModel asignacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_pregunta", nullable = false)
    private PreguntaModel pregunta;

    @Column(name = "Respuesta", columnDefinition = "TEXT")
    private String respuesta;

    @Column(name = "Fecha_respuesta")
    private LocalDateTime fechaRespuesta;

    @PrePersist
    public void prePersist() {
        if (fechaRespuesta == null) {
            fechaRespuesta = LocalDateTime.now();
        }
    }

    public Long getId() {
        return id;
    }

    public EvaluacionAsignadaModel getAsignacion() {
        return asignacion;
    }

    public void setAsignacion(EvaluacionAsignadaModel asignacion) {
        this.asignacion = asignacion;
    }

    public PreguntaModel getPregunta() {
        return pregunta;
    }

    public void setPregunta(PreguntaModel pregunta) {
        this.pregunta = pregunta;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public LocalDateTime getFechaRespuesta() {
        return fechaRespuesta;
    }

    public void setFechaRespuesta(LocalDateTime fechaRespuesta) {
        this.fechaRespuesta = fechaRespuesta;
    }
}

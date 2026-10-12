package com.safe.dto;

import com.safe.model.PreguntaModel;

import java.math.BigDecimal;

public class PreguntaRendirResponseDTO {

    private Long id;
    private Integer idEvaluacion;
    private String pregunta;
    private String tipo;
    private BigDecimal peso;

    public PreguntaRendirResponseDTO(PreguntaModel pregunta) {
        this.id = pregunta.getId();
        this.idEvaluacion = pregunta.getEvaluacion().getId();
        this.pregunta = pregunta.getPregunta();
        this.tipo = pregunta.getTipo();
        this.peso = pregunta.getPeso();
    }

    public Long getId() {
        return id;
    }

    public Integer getIdEvaluacion() {
        return idEvaluacion;
    }

    public String getPregunta() {
        return pregunta;
    }

    public String getTipo() {
        return tipo;
    }

    public BigDecimal getPeso() {
        return peso;
    }
}

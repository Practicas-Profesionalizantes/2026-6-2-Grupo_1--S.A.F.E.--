package com.safe.dto;

import com.safe.model.PreguntaModel;

import java.math.BigDecimal;
import java.util.List;

public class PreguntaResponseDTO {

    private Long id;
    private Integer idEvaluacion;
    private String pregunta;
    private String tipo;
    private String respuestaCorrecta;
    private BigDecimal peso;
    private List<String> opciones;

    public PreguntaResponseDTO(PreguntaModel pregunta) {
        this.id = pregunta.getId();
        this.idEvaluacion = pregunta.getEvaluacion().getId();
        this.pregunta = pregunta.getPregunta();
        this.tipo = pregunta.getTipo();
        this.respuestaCorrecta = pregunta.getRespuestaCorrecta();
        this.peso = pregunta.getPeso();
        this.opciones = pregunta.getOpciones();
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

    public String getRespuestaCorrecta() {
        return respuestaCorrecta;
    }

    public BigDecimal getPeso() {
        return peso;
    }

    public List<String> getOpciones() {
        return opciones;
    }
}

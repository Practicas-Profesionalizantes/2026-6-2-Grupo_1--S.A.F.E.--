package com.safe.dto;

import com.safe.model.EvaluacionModel;

import java.math.BigDecimal;

public class EvaluacionResponseDTO {

    private Integer id;
    private String tipo;
    private Integer duracion;
    private BigDecimal puntajeMin;
    private BigDecimal puntajeMax;
    private Boolean online;
    private Integer idPuesto;

    public EvaluacionResponseDTO(EvaluacionModel evaluacion) {
        this.id = evaluacion.getId();
        this.tipo = evaluacion.getTipo();
        this.duracion = evaluacion.getDuracion();
        this.puntajeMin = evaluacion.getPuntajeMin();
        this.puntajeMax = evaluacion.getPuntajeMax();
        this.online = evaluacion.getOnline();
        this.idPuesto = evaluacion.getIdPuesto();
    }

    public Integer getId() {
        return id;
    }

    public String getTipo() {
        return tipo;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public BigDecimal getPuntajeMin() {
        return puntajeMin;
    }

    public BigDecimal getPuntajeMax() {
        return puntajeMax;
    }

    public Boolean getOnline() {
        return online;
    }

    public Integer getIdPuesto() {
        return idPuesto;
    }
}

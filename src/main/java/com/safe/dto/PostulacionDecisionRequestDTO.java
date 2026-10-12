package com.safe.dto;

public class PostulacionDecisionRequestDTO {

    private Boolean cumple;
    private String observacion;

    public Boolean getCumple() {
        return cumple;
    }

    public void setCumple(Boolean cumple) {
        this.cumple = cumple;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }
}

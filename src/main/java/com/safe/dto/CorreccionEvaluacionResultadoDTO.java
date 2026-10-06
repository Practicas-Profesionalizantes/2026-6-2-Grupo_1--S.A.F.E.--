package com.safe.dto;

import java.math.BigDecimal;

public class CorreccionEvaluacionResultadoDTO {

    private Long idAsignacion;
    private BigDecimal puntajeTotal;
    private Boolean aprobado;
    private String observacionesIa;
    private String estado;

    public Long getIdAsignacion() {
        return idAsignacion;
    }

    public void setIdAsignacion(Long idAsignacion) {
        this.idAsignacion = idAsignacion;
    }

    public BigDecimal getPuntajeTotal() {
        return puntajeTotal;
    }

    public void setPuntajeTotal(BigDecimal puntajeTotal) {
        this.puntajeTotal = puntajeTotal;
    }

    public Boolean getAprobado() {
        return aprobado;
    }

    public void setAprobado(Boolean aprobado) {
        this.aprobado = aprobado;
    }

    public String getObservacionesIa() {
        return observacionesIa;
    }

    public void setObservacionesIa(String observacionesIa) {
        this.observacionesIa = observacionesIa;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }
}

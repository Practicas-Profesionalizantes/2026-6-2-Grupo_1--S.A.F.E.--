package com.safe.dto;

import java.math.BigDecimal;

public class RankingResponseDTO {
    private final Long idPuesto;
    private final Long idPostulante;
    private final BigDecimal promedioFinal;

    public RankingResponseDTO(Long idPuesto, Long idPostulante, BigDecimal promedioFinal) {
        this.idPuesto = idPuesto;
        this.idPostulante = idPostulante;
        this.promedioFinal = promedioFinal;
    }

    public Long getIdPuesto() {
        return idPuesto;
    }

    public Long getIdPostulante() {
        return idPostulante;
    }

    public BigDecimal getPromedioFinal() {
        return promedioFinal;
    }
}

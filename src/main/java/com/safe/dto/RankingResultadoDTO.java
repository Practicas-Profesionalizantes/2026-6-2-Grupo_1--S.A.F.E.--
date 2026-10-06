package com.safe.dto;

import java.math.BigDecimal;
import java.util.List;

public class RankingResultadoDTO {

    private List<Item> ranking;

    public List<Item> getRanking() {
        return ranking;
    }

    public void setRanking(List<Item> ranking) {
        this.ranking = ranking;
    }

    public static class Item {
        private Integer idPostulante;
        private BigDecimal promedioFinal;

        public Integer getIdPostulante() {
            return idPostulante;
        }

        public void setIdPostulante(Integer idPostulante) {
            this.idPostulante = idPostulante;
        }

        public BigDecimal getPromedioFinal() {
            return promedioFinal;
        }

        public void setPromedioFinal(BigDecimal promedioFinal) {
            this.promedioFinal = promedioFinal;
        }
    }
}

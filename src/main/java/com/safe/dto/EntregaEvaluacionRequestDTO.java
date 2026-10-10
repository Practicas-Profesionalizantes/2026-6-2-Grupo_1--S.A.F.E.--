package com.safe.dto;

import java.util.List;

public class EntregaEvaluacionRequestDTO {

    private List<RespuestaEvaluacionRequestDTO> respuestas;

    public List<RespuestaEvaluacionRequestDTO> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<RespuestaEvaluacionRequestDTO> respuestas) {
        this.respuestas = respuestas;
    }
}

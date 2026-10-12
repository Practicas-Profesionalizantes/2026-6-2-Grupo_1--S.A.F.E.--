package com.safe.dto;

import java.util.List;

public class EntregaEvaluacionRequestDTO {

    private List<RespuestaEvaluacionRequestDTO> respuestas;
    private Boolean envioAutomatico;

    public List<RespuestaEvaluacionRequestDTO> getRespuestas() {
        return respuestas;
    }

    public void setRespuestas(List<RespuestaEvaluacionRequestDTO> respuestas) {
        this.respuestas = respuestas;
    }

    public Boolean getEnvioAutomatico() {
        return envioAutomatico;
    }

    public void setEnvioAutomatico(Boolean envioAutomatico) {
        this.envioAutomatico = envioAutomatico;
    }
}

package com.safe.dto;

import java.util.List;

public class HistorialPostulanteResponseDTO {

    private PostulanteResponseDTO postulante;
    private List<PostulacionResponseDTO> postulaciones;
    private List<EvaluacionAsignadaResponseDTO> evaluaciones;
    private List<EntrevistaResponseDTO> entrevistas;

    public HistorialPostulanteResponseDTO(
            PostulanteResponseDTO postulante,
            List<PostulacionResponseDTO> postulaciones,
            List<EvaluacionAsignadaResponseDTO> evaluaciones,
            List<EntrevistaResponseDTO> entrevistas) {
        this.postulante = postulante;
        this.postulaciones = postulaciones;
        this.evaluaciones = evaluaciones;
        this.entrevistas = entrevistas;
    }

    public PostulanteResponseDTO getPostulante() {
        return postulante;
    }

    public List<PostulacionResponseDTO> getPostulaciones() {
        return postulaciones;
    }

    public List<EvaluacionAsignadaResponseDTO> getEvaluaciones() {
        return evaluaciones;
    }

    public List<EntrevistaResponseDTO> getEntrevistas() {
        return entrevistas;
    }
}

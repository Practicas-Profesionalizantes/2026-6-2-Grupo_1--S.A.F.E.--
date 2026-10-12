package com.safe.service;

import com.safe.dto.EntrevistaResponseDTO;
import com.safe.dto.EvaluacionAsignadaResponseDTO;
import com.safe.dto.HistorialPostulanteResponseDTO;
import com.safe.dto.PostulacionResponseDTO;
import com.safe.dto.PostulanteResponseDTO;
import com.safe.model.PostulanteModel;
import com.safe.repository.EvaluacionAsignadaRepository;
import com.safe.repository.PostulacionRepository;
import com.safe.repository.PostulanteRepository;
import org.springframework.stereotype.Service;

@Service
public class HistorialPostulanteService {

    private final PostulanteRepository postulanteRepository;
    private final PostulacionRepository postulacionRepository;
    private final EvaluacionAsignadaRepository evaluacionAsignadaRepository;
    private final EntrevistaService entrevistaService;

    public HistorialPostulanteService(
            PostulanteRepository postulanteRepository,
            PostulacionRepository postulacionRepository,
            EvaluacionAsignadaRepository evaluacionAsignadaRepository,
            EntrevistaService entrevistaService) {
        this.postulanteRepository = postulanteRepository;
        this.postulacionRepository = postulacionRepository;
        this.evaluacionAsignadaRepository = evaluacionAsignadaRepository;
        this.entrevistaService = entrevistaService;
    }

    public HistorialPostulanteResponseDTO obtener(Long idPostulante) {
        PostulanteModel postulante = postulanteRepository.findById(idPostulante)
                .orElseThrow(() -> new RuntimeException("Postulante no encontrado"));

        return new HistorialPostulanteResponseDTO(
                new PostulanteResponseDTO(postulante),
                postulacionRepository.findByPostulanteId(idPostulante)
                        .stream()
                        .map(PostulacionResponseDTO::new)
                        .toList(),
                evaluacionAsignadaRepository.findByPostulanteOrderByFechaDescHoraInicioDesc(postulante)
                        .stream()
                        .map(EvaluacionAsignadaResponseDTO::new)
                        .toList(),
                entrevistaService.listarPorPostulante(idPostulante)
                        .stream()
                        .map(EntrevistaResponseDTO::new)
                        .toList()
        );
    }
}

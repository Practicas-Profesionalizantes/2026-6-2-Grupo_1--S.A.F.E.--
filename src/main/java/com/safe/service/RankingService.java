package com.safe.service;

import com.safe.dto.RankingResponseDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.PostulacionModel;
import com.safe.repository.EvaluacionAsignadaRepository;
import com.safe.repository.PostulacionRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class RankingService {

    private static final BigDecimal CIEN = BigDecimal.valueOf(100);

    private final PostulacionRepository postulacionRepository;
    private final EvaluacionAsignadaRepository evaluacionAsignadaRepository;
    private final BigDecimal pesoCv;
    private final BigDecimal pesoEvaluaciones;

    public RankingService(
            PostulacionRepository postulacionRepository,
            EvaluacionAsignadaRepository evaluacionAsignadaRepository,
            @Value("${safe.ranking.peso-cv:0.4}") BigDecimal pesoCv,
            @Value("${safe.ranking.peso-evaluaciones:0.6}") BigDecimal pesoEvaluaciones) {
        this.postulacionRepository = postulacionRepository;
        this.evaluacionAsignadaRepository = evaluacionAsignadaRepository;
        this.pesoCv = pesoCv;
        this.pesoEvaluaciones = pesoEvaluaciones;
        validarPesos();
    }

    public List<RankingResponseDTO> calcularRanking() {
        List<RankingResponseDTO> ranking = new ArrayList<>();

        for (PostulacionModel postulacion : postulacionRepository.findAll()) {
            calcularPuntaje(postulacion).ifPresent(ranking::add);
        }

        ranking.sort(Comparator
                .comparing(RankingResponseDTO::getIdPuesto)
                .thenComparing(RankingResponseDTO::getPromedioFinal, Comparator.reverseOrder())
                .thenComparing(RankingResponseDTO::getIdPostulante));
        return ranking;
    }

    private Optional<RankingResponseDTO> calcularPuntaje(PostulacionModel postulacion) {
        if (!"CUMPLE_CV".equals(postulacion.getEstado()) || !puntajeValido(postulacion.getScoreIa())) {
            return Optional.empty();
        }

        Long idPuesto = postulacion.getPuesto().getId();
        Map<Integer, EvaluacionAsignadaModel> ultimasAsignaciones = new HashMap<>();

        for (EvaluacionAsignadaModel asignacion : evaluacionAsignadaRepository
                .findByPostulanteOrderByFechaDescHoraInicioDesc(postulacion.getPostulante())) {
            if (!Objects.equals(asignacion.getIdPuesto(), idPuesto)) {
                continue;
            }

            ultimasAsignaciones.merge(
                    asignacion.getEvaluacion().getId(),
                    asignacion,
                    (actual, candidata) -> actual.getId() > candidata.getId() ? actual : candidata
            );
        }

        if (ultimasAsignaciones.isEmpty()
                || ultimasAsignaciones.values().stream().anyMatch(asignacion -> !estaCorregida(asignacion))) {
            return Optional.empty();
        }

        BigDecimal sumaEvaluaciones = ultimasAsignaciones.values().stream()
                .map(this::normalizarPuntaje)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal promedioEvaluaciones = sumaEvaluaciones.divide(
                BigDecimal.valueOf(ultimasAsignaciones.size()), 8, RoundingMode.HALF_UP);
        BigDecimal promedioFinal = postulacion.getScoreIa().multiply(pesoCv)
                .add(promedioEvaluaciones.multiply(pesoEvaluaciones))
                .setScale(2, RoundingMode.HALF_UP);

        return Optional.of(new RankingResponseDTO(
                idPuesto,
                postulacion.getPostulante().getId(),
                promedioFinal
        ));
    }

    private boolean estaCorregida(EvaluacionAsignadaModel asignacion) {
        return "FINALIZADA".equals(asignacion.getEstado())
                && asignacion.getPuntajeTotal() != null
                && asignacion.getPuntajeMaxResultado() != null
                && asignacion.getPuntajeMaxResultado().signum() > 0
                && asignacion.getPuntajeTotal().signum() >= 0
                && asignacion.getPuntajeTotal().compareTo(asignacion.getPuntajeMaxResultado()) <= 0;
    }

    private BigDecimal normalizarPuntaje(EvaluacionAsignadaModel asignacion) {
        return asignacion.getPuntajeTotal()
                .multiply(CIEN)
                .divide(asignacion.getPuntajeMaxResultado(), 8, RoundingMode.HALF_UP);
    }

    private boolean puntajeValido(BigDecimal puntaje) {
        return puntaje != null && puntaje.signum() >= 0 && puntaje.compareTo(CIEN) <= 0;
    }

    private void validarPesos() {
        if (pesoCv == null || pesoEvaluaciones == null
                || pesoCv.signum() < 0 || pesoEvaluaciones.signum() < 0
                || pesoCv.add(pesoEvaluaciones).compareTo(BigDecimal.ONE) != 0) {
            throw new IllegalArgumentException("Los pesos del ranking deben ser no negativos y sumar 1");
        }
    }
}

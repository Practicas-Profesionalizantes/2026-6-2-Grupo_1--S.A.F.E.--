package com.safe.service;

import com.safe.dto.PreguntaRequestDTO;
import com.safe.model.EvaluacionModel;
import com.safe.model.PreguntaModel;
import com.safe.repository.PreguntaRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import java.util.Objects;

@Service
public class PreguntaService {

    private final PreguntaRepository preguntaRepository;
    private final EvaluacionService evaluacionService;

    public PreguntaService(PreguntaRepository preguntaRepository, EvaluacionService evaluacionService) {
        this.preguntaRepository = preguntaRepository;
        this.evaluacionService = evaluacionService;
    }

    public PreguntaModel crear(Integer idEvaluacion, PreguntaRequestDTO dto) {
        validar(dto);

        EvaluacionModel evaluacion = evaluacionService.obtenerPorId(idEvaluacion);
        PreguntaModel pregunta = new PreguntaModel();
        pregunta.setEvaluacion(evaluacion);
        cargarDatos(pregunta, dto);

        return preguntaRepository.save(pregunta);
    }

    public List<PreguntaModel> listarPorEvaluacion(Integer idEvaluacion) {
        evaluacionService.obtenerPorId(idEvaluacion);
        return preguntaRepository.findByEvaluacionIdOrderByIdAsc(idEvaluacion);
    }

    public PreguntaModel obtenerPorId(Long id) {
        return preguntaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));
    }

    public PreguntaModel actualizar(Long id, PreguntaRequestDTO dto) {
        validar(dto);

        PreguntaModel pregunta = obtenerPorId(id);
        cargarDatos(pregunta, dto);

        return preguntaRepository.save(pregunta);
    }

    public void eliminar(Long id) {
        PreguntaModel pregunta = obtenerPorId(id);
        preguntaRepository.delete(pregunta);
    }

    private void cargarDatos(PreguntaModel pregunta, PreguntaRequestDTO dto) {
        pregunta.setPregunta(dto.getPregunta().trim());
        pregunta.setTipo(dto.getTipo().trim().toUpperCase());
        pregunta.setRespuestaCorrecta(dto.getRespuestaCorrecta().trim());
        pregunta.setPeso(dto.getPeso() != null ? dto.getPeso() : BigDecimal.ONE);
        pregunta.setOpciones(normalizarOpciones(dto.getOpciones(), pregunta.getTipo()));
    }

    private void validar(PreguntaRequestDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Los datos de la pregunta son obligatorios");
        }

        if (estaVacio(dto.getPregunta())) {
            throw new IllegalArgumentException("El enunciado de la pregunta es obligatorio");
        }

        if (estaVacio(dto.getTipo())) {
            throw new IllegalArgumentException("El tipo de pregunta es obligatorio");
        }

        if (estaVacio(dto.getRespuestaCorrecta())) {
            throw new IllegalArgumentException("La respuesta correcta es obligatoria");
        }

        String tipo = dto.getTipo().trim().toUpperCase(Locale.ROOT);
        List<String> opciones = normalizarOpciones(dto.getOpciones(), tipo);
        if ("OPCION_MULTIPLE".equals(tipo) && opciones.size() < 2) {
            throw new IllegalArgumentException("La opcion multiple debe tener al menos dos opciones");
        }
        if (("OPCION_MULTIPLE".equals(tipo) || "VERDADERO_FALSO".equals(tipo))
                && !opciones.contains(dto.getRespuestaCorrecta().trim())) {
            throw new IllegalArgumentException("La respuesta correcta debe coincidir con una de las opciones");
        }

        if (dto.getPeso() != null && dto.getPeso().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("El peso debe ser mayor a cero");
        }
    }

    private boolean estaVacio(String valor) {
        return valor == null || valor.trim().isEmpty();
    }

    private List<String> normalizarOpciones(List<String> opciones, String tipo) {
        if (!"OPCION_MULTIPLE".equals(tipo) && !"VERDADERO_FALSO".equals(tipo)) {
            return List.of();
        }

        return (opciones == null ? List.<String>of() : opciones).stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(opcion -> !opcion.isEmpty())
                .distinct()
                .toList();
    }
}

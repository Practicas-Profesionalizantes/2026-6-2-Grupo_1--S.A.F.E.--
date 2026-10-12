package com.safe.service;

import com.safe.dto.EntrevistaRequestDTO;
import com.safe.model.EntrevistaModel;
import com.safe.model.PostulanteModel;
import com.safe.model.PuestoModel;
import com.safe.repository.EntrevistaRepository;
import com.safe.repository.PostulanteRepository;
import com.safe.repository.PuestoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EntrevistaService {

    private final EntrevistaRepository entrevistaRepository;
    private final PostulanteRepository postulanteRepository;
    private final PuestoRepository puestoRepository;

    public EntrevistaService(
            EntrevistaRepository entrevistaRepository,
            PostulanteRepository postulanteRepository,
            PuestoRepository puestoRepository) {
        this.entrevistaRepository = entrevistaRepository;
        this.postulanteRepository = postulanteRepository;
        this.puestoRepository = puestoRepository;
    }

    public EntrevistaModel crear(EntrevistaRequestDTO dto) {
        validar(dto);

        PostulanteModel postulante = postulanteRepository.findById(dto.getIdPostulante())
                .orElseThrow(() -> new RuntimeException("Postulante no encontrado"));

        EntrevistaModel entrevista = new EntrevistaModel();
        entrevista.setPostulante(postulante);
        aplicarDatos(entrevista, dto);

        return entrevistaRepository.save(entrevista);
    }

    public List<EntrevistaModel> listarTodas() {
        return entrevistaRepository.findAllByOrderByFechaAscHoraAsc();
    }

    public List<EntrevistaModel> listarPorPostulante(Long idPostulante) {
        return entrevistaRepository.findByPostulanteIdOrderByFechaDescHoraDesc(idPostulante);
    }

    public EntrevistaModel actualizar(Long id, EntrevistaRequestDTO dto) {
        validar(dto);

        EntrevistaModel entrevista = entrevistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrevista no encontrada"));

        if (!entrevista.getPostulante().getId().equals(dto.getIdPostulante())) {
            PostulanteModel postulante = postulanteRepository.findById(dto.getIdPostulante())
                    .orElseThrow(() -> new RuntimeException("Postulante no encontrado"));
            entrevista.setPostulante(postulante);
        }

        aplicarDatos(entrevista, dto);
        return entrevistaRepository.save(entrevista);
    }

    public EntrevistaModel cambiarEstado(Long id, String estado, String resultado) {
        EntrevistaModel entrevista = entrevistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrevista no encontrada"));

        if (estado == null || estado.isBlank()) {
            throw new IllegalArgumentException("El estado es obligatorio");
        }

        entrevista.setEstado(estado.trim().toUpperCase());
        if (resultado != null) {
            entrevista.setResultado(resultado.trim());
        }

        return entrevistaRepository.save(entrevista);
    }

    public void eliminar(Long id) {
        EntrevistaModel entrevista = entrevistaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrevista no encontrada"));
        entrevistaRepository.delete(entrevista);
    }

    private void aplicarDatos(EntrevistaModel entrevista, EntrevistaRequestDTO dto) {
        entrevista.setFecha(dto.getFecha());
        entrevista.setHora(dto.getHora());
        entrevista.setModalidad(valorODefault(dto.getModalidad(), "PRESENCIAL"));
        entrevista.setUbicacion(dto.getUbicacion());
        entrevista.setEstado(valorODefault(dto.getEstado(), "PROGRAMADA"));
        entrevista.setObservaciones(dto.getObservaciones());
        entrevista.setResultado(dto.getResultado());

        if (dto.getIdPuesto() != null) {
            PuestoModel puesto = puestoRepository.findById(dto.getIdPuesto())
                    .orElseThrow(() -> new RuntimeException("Puesto no encontrado"));
            entrevista.setPuesto(puesto);
        } else {
            entrevista.setPuesto(null);
        }
    }

    private void validar(EntrevistaRequestDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Los datos de la entrevista son obligatorios");
        }
        if (dto.getIdPostulante() == null) {
            throw new IllegalArgumentException("El postulante es obligatorio");
        }
        if (dto.getFecha() == null) {
            throw new IllegalArgumentException("La fecha es obligatoria");
        }
        if (dto.getHora() == null) {
            throw new IllegalArgumentException("La hora es obligatoria");
        }
    }

    private String valorODefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value.trim().toUpperCase();
    }
}

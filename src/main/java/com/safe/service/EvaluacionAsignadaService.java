package com.safe.service;

import com.safe.dto.EvaluacionAsignadaRequestDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.EvaluacionModel;
import com.safe.model.PostulanteModel;
import com.safe.model.UsuarioModel;
import com.safe.repository.EvaluacionAsignadaRepository;
import com.safe.repository.PostulanteRepository;
import com.safe.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class EvaluacionAsignadaService {

    private final EvaluacionAsignadaRepository evaluacionAsignadaRepository;
    private final EvaluacionService evaluacionService;
    private final PostulanteRepository postulanteRepository;
    private final UsuarioRepository usuarioRepository;
    private final com.safe.repository.PostulacionRepository postulacionRepository;

    public EvaluacionAsignadaService(
            EvaluacionAsignadaRepository evaluacionAsignadaRepository,
            EvaluacionService evaluacionService,
            PostulanteRepository postulanteRepository,
            UsuarioRepository usuarioRepository,
            com.safe.repository.PostulacionRepository postulacionRepository) {
        this.postulacionRepository = postulacionRepository;

        this.evaluacionAsignadaRepository = evaluacionAsignadaRepository;
        this.evaluacionService = evaluacionService;
        this.postulanteRepository = postulanteRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public EvaluacionAsignadaModel asignar(EvaluacionAsignadaRequestDTO dto) {
        validar(dto);

        EvaluacionModel evaluacion = evaluacionService.obtenerPorId(dto.getIdEvaluacion());
        PostulanteModel postulante = postulanteRepository.findById(dto.getIdPostulante())
                .orElseThrow(() -> new RuntimeException("Postulante no encontrado"));

        EvaluacionAsignadaModel asignacion = new EvaluacionAsignadaModel();
        Long idPuesto = dto.getIdPuesto() != null ? dto.getIdPuesto()
                : evaluacion.getIdPuesto() == null ? null : evaluacion.getIdPuesto().longValue();
        if (idPuesto != null && !postulacionRepository.existsById(
                new com.safe.model.PostulacionId(postulante.getId(), idPuesto))) {
            throw new IllegalArgumentException("El postulante no tiene postulacion para ese puesto");
        }
        if (idPuesto != null && evaluacion.getIdPuesto() != null
                && idPuesto.longValue() != evaluacion.getIdPuesto().longValue()) {
            throw new IllegalArgumentException("La evaluacion pertenece a otro puesto");
        }
        asignacion.setIdPuesto(idPuesto);
        asignacion.setEvaluacion(evaluacion);
        asignacion.setPostulante(postulante);
        asignacion.setFecha(dto.getFecha());
        asignacion.setHoraInicio(dto.getHoraInicio());
        asignacion.setHoraFin(dto.getHoraFin());
        asignacion.setObservaciones(dto.getObservaciones());
        asignacion.setEstado("PENDIENTE");
        asignacion.setIntento(1);

        return evaluacionAsignadaRepository.save(asignacion);
    }

    public List<EvaluacionAsignadaModel> listarTodas() {
        return evaluacionAsignadaRepository.findAll();
    }

    public List<EvaluacionAsignadaModel> listarDelPostulante(String email) {
        UsuarioModel usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        PostulanteModel postulante = postulanteRepository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Perfil de postulante no encontrado"));

        return evaluacionAsignadaRepository.findByPostulanteOrderByFechaDescHoraInicioDesc(postulante);
    }

    public EvaluacionAsignadaModel cambiarEstado(Long id, String estado) {
        if (estado == null || estado.trim().isEmpty()) {
            throw new IllegalArgumentException("El estado es obligatorio");
        }

        EvaluacionAsignadaModel asignacion = obtenerPorId(id);
        asignacion.setEstado(estado.trim().toUpperCase());

        return evaluacionAsignadaRepository.save(asignacion);
    }

    public EvaluacionAsignadaModel obtenerPorId(Long id) {
        return evaluacionAsignadaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignacion de evaluacion no encontrada"));
    }

    public EvaluacionAsignadaModel registrarResultadoCorreccion(
            Long id,
            BigDecimal puntajeTotal,
            Boolean aprobado,
            String observacionesIa,
            String estado) {

        EvaluacionAsignadaModel asignacion = obtenerPorId(id);
        BigDecimal max = asignacion.getEvaluacion().getPuntajeMax();
        if (max == null || max.signum() <= 0 || puntajeTotal == null
                || puntajeTotal.signum() < 0 || puntajeTotal.compareTo(max) > 0 || aprobado == null) {
            throw new IllegalArgumentException("Resultado de correccion invalido");
        }
        asignacion.setPuntajeTotal(puntajeTotal);
        asignacion.setPuntajeMaxResultado(max);
        asignacion.setAprobado(aprobado);
        asignacion.setEstado(
                estado == null || estado.isBlank()
                        ? "FINALIZADA"
                        : estado.trim().toUpperCase()
        );

        String resumen = "Resultado IA"
                + " | puntajeTotal=" + (puntajeTotal != null ? puntajeTotal : "SIN_PUNTAJE")
                + " | aprobado=" + (aprobado != null ? aprobado : "SIN_DEFINIR")
                + " | observaciones=" + (observacionesIa != null ? observacionesIa : "");

        asignacion.setObservaciones(resumen);

        return evaluacionAsignadaRepository.save(asignacion);
    }

    private void validar(EvaluacionAsignadaRequestDTO dto) {
        if (dto == null) {
            throw new IllegalArgumentException("Los datos de la asignacion son obligatorios");
        }

        if (dto.getIdEvaluacion() == null) {
            throw new IllegalArgumentException("La evaluacion es obligatoria");
        }

        if (dto.getIdPostulante() == null) {
            throw new IllegalArgumentException("El postulante es obligatorio");
        }

        if (dto.getFecha() == null) {
            throw new IllegalArgumentException("La fecha es obligatoria");
        }

        if (dto.getHoraInicio() == null || dto.getHoraFin() == null) {
            throw new IllegalArgumentException("La hora de inicio y fin son obligatorias");
        }

        if (!dto.getHoraFin().isAfter(dto.getHoraInicio())) {
            throw new IllegalArgumentException("La hora de fin debe ser posterior a la hora de inicio");
        }
    }
}

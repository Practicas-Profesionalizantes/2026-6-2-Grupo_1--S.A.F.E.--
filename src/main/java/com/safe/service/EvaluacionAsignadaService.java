package com.safe.service;

import com.safe.dto.EvaluacionAsignadaRequestDTO;
import com.safe.dto.NotificacionWorkflowDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.EvaluacionModel;
import com.safe.model.PostulanteModel;
import com.safe.model.UsuarioModel;
import com.safe.repository.EvaluacionAsignadaRepository;
import com.safe.repository.PostulanteRepository;
import com.safe.repository.UsuarioRepository;
import com.safe.repository.RespuestaEvaluacionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EvaluacionAsignadaService {

    private final EvaluacionAsignadaRepository evaluacionAsignadaRepository;
    private final EvaluacionService evaluacionService;
    private final PostulanteRepository postulanteRepository;
    private final UsuarioRepository usuarioRepository;
    private final com.safe.repository.PostulacionRepository postulacionRepository;
    private final N8nWorkflowService n8nWorkflowService;
    private final RespuestaEvaluacionRepository respuestaEvaluacionRepository;

    public EvaluacionAsignadaService(
            EvaluacionAsignadaRepository evaluacionAsignadaRepository,
            EvaluacionService evaluacionService,
            PostulanteRepository postulanteRepository,
            UsuarioRepository usuarioRepository,
            com.safe.repository.PostulacionRepository postulacionRepository,
            N8nWorkflowService n8nWorkflowService,
            RespuestaEvaluacionRepository respuestaEvaluacionRepository) {
        this.postulacionRepository = postulacionRepository;
        this.n8nWorkflowService = n8nWorkflowService;
        this.respuestaEvaluacionRepository = respuestaEvaluacionRepository;

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

        EvaluacionAsignadaModel guardada = evaluacionAsignadaRepository.save(asignacion);
        try {
            boolean notificacionEnviada = n8nWorkflowService.enviarNotificacionEvaluacion(guardada);
            if (!notificacionEnviada) {
                System.err.println("La evaluacion se asigno, pero no se pudo enviar la notificacion a n8n.");
            }
        } catch (RuntimeException errorNotificacion) {
            System.err.println("La evaluacion se asigno, pero fallo la preparacion de la notificacion: "
                    + errorNotificacion.getMessage());
        }

        return guardada;
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

    @Transactional
    public void eliminar(Long id) {
        obtenerPorId(id);
        respuestaEvaluacionRepository.deleteByAsignacionId(id);
        evaluacionAsignadaRepository.deleteById(id);
    }

    public EvaluacionAsignadaModel registrarDecisionRrhh(Long id, boolean aprobado) {
        EvaluacionAsignadaModel asignacion = obtenerPorId(id);
        if (!"FINALIZADA".equalsIgnoreCase(asignacion.getEstado())) {
            throw new IllegalArgumentException("La evaluacion debe estar finalizada antes de decidirla");
        }
        asignacion.setAprobado(aprobado);
        EvaluacionAsignadaModel guardada = evaluacionAsignadaRepository.save(asignacion);

        NotificacionWorkflowDTO notificacion = new NotificacionWorkflowDTO();
        notificacion.setIdPostulante(asignacion.getPostulante().getId());
        notificacion.setTipo(aprobado ? "RESULTADO_DISPONIBLE" : "EVALUACION_DESAPROBADA");
        notificacion.setEstado("PENDIENTE_ENVIO");
        notificacion.setMensaje(aprobado
                ? "Aprobaste la evaluacion y continuas en el proceso de seleccion."
                : "No alcanzaste el resultado esperado en la evaluacion.");
        notificacion.setDetalle("RRHH registro la decision sobre la evaluacion "
                + asignacion.getEvaluacion().getNombre() + ".");
        Map<String, Object> datos = new HashMap<>();
        datos.put("evaluacion", asignacion.getEvaluacion().getNombre());
        datos.put("puntaje", asignacion.getPuntajeTotal() != null ? asignacion.getPuntajeTotal() : 0);
        datos.put("aprobado", aprobado);
        notificacion.setDatos(datos);
        try {
            n8nWorkflowService.enviarNotificacion(notificacion);
        } catch (RuntimeException errorCallback) {
            System.err.println("La decision se guardo, pero no se pudo enviar la notificacion: " + errorCallback.getMessage());
        }

        return guardada;
    }

    public EvaluacionAsignadaModel registrarResultadoCorreccion(
            Long id,
            BigDecimal puntajeTotal,
            String observacionesIa,
            String estado) {

        EvaluacionAsignadaModel asignacion = obtenerPorId(id);
        BigDecimal max = asignacion.getEvaluacion().getPuntajeMax();
        if (max == null || max.signum() <= 0 || puntajeTotal == null
                || puntajeTotal.signum() < 0 || puntajeTotal.compareTo(max) > 0) {
            throw new IllegalArgumentException("Resultado de correccion invalido");
        }
        asignacion.setPuntajeTotal(puntajeTotal);
        asignacion.setPuntajeMaxResultado(max);
        // La IA informa el puntaje; la decisión de RRHH se toma por separado.
        asignacion.setAprobado(null);
        asignacion.setEstado(
                estado == null || estado.isBlank()
                        ? "FINALIZADA"
                        : estado.trim().toUpperCase()
        );

        String resumen = "Resultado IA"
                + " | puntajeTotal=" + (puntajeTotal != null ? puntajeTotal : "SIN_PUNTAJE")
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

package com.safe.service;

import com.safe.dto.AnalisisCvResultadoDTO;
import com.safe.dto.NotificacionWorkflowDTO;
import com.safe.model.PostulacionId;
import com.safe.model.PostulacionModel;
import com.safe.model.PostulanteModel;
import com.safe.model.PuestoModel;
import com.safe.repository.PostulacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class PostulacionService {

    private final PostulacionRepository postulacionRepository;
    private final PostulanteService postulanteService;
    private final PuestoService puestoService;
    private final N8nWorkflowService n8nWorkflowService;

    public PostulacionService(PostulacionRepository postulacionRepository,
                              PostulanteService postulanteService,
                              PuestoService puestoService,
                              N8nWorkflowService n8nWorkflowService) {
        this.postulacionRepository = postulacionRepository;
        this.postulanteService = postulanteService;
        this.puestoService = puestoService;
        this.n8nWorkflowService = n8nWorkflowService;
    }

    public PostulacionModel postularse(String emailPostulante, Long idPuesto) {
        PostulanteModel postulante = postulanteService.obtenerPorEmail(emailPostulante);
        PuestoModel puesto = puestoService.obtenerDetalle(idPuesto);

        validarPerfilListoParaPostulacion(postulante);

        PostulacionId id = new PostulacionId(postulante.getId(), puesto.getId());

        Optional<PostulacionModel> existe = postulacionRepository.findById(id);
        if (existe.isPresent()) {
            throw new RuntimeException("Ya te has postulado a este puesto.");
        }

        PostulacionModel nuevaPostulacion = new PostulacionModel();
        nuevaPostulacion.setId(id);
        nuevaPostulacion.setPostulante(postulante);
        nuevaPostulacion.setPuesto(puesto);
        nuevaPostulacion.setEstado("PENDIENTE");

        PostulacionModel guardada = postulacionRepository.save(nuevaPostulacion);
        n8nWorkflowService.enviarAnalisisCv(postulante, puesto);

        return guardada;
    }

    public List<PostulacionModel> listarTodas() {
        return postulacionRepository.findAll();
    }

    public List<PostulacionModel> listarDelPostulante(String emailPostulante) {
        PostulanteModel postulante = postulanteService.obtenerPorEmail(emailPostulante);
        return postulacionRepository.findByPostulanteId(postulante.getId());
    }

    public PostulacionModel actualizarResultadoAnalisisCv(AnalisisCvResultadoDTO dto) {
        if (dto.getIdPostulante() == null || dto.getIdPuesto() == null) {
            throw new IllegalArgumentException("idPostulante e idPuesto son obligatorios");
        }

        PostulacionId id = new PostulacionId(dto.getIdPostulante(), dto.getIdPuesto());
        PostulacionModel postulacion = postulacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Postulacion no encontrada"));

        postulacion.setScoreIa(dto.getScoreIa());
        postulacion.setObservacionesIa(dto.getObservacionesIa());
        postulacion.setEstado(
                dto.getEstado() == null || dto.getEstado().isBlank()
                        ? "ANALIZADO_IA"
                        : dto.getEstado()
        );

        return postulacionRepository.save(postulacion);
    }

    public Map<String, Object> enviarRankingAn8n() {
        boolean enviado = n8nWorkflowService.enviarRanking(listarTodas());
        return Map.of(
                "enviado", enviado,
                "message", enviado ? "Workflow de ranking enviado a n8n" : "Webhook de ranking no configurado o no disponible"
        );
    }

    public PostulacionModel registrarDecisionRrhh(
            Long idPostulante,
            Long idPuesto,
            Boolean cumple,
            String observacion) {

        if (idPostulante == null || idPuesto == null) {
            throw new IllegalArgumentException("idPostulante e idPuesto son obligatorios");
        }

        if (cumple == null) {
            throw new IllegalArgumentException("La decision de RRHH es obligatoria");
        }

        PostulacionId id = new PostulacionId(idPostulante, idPuesto);
        PostulacionModel postulacion = postulacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Postulacion no encontrada"));

        postulacion.setEstado(cumple ? "CUMPLE_CV" : "NO_CUMPLE_CV");
        if (!estaVacio(observacion)) {
            String observacionActual = postulacion.getObservacionesIa();
            postulacion.setObservacionesIa(
                    (observacionActual == null || observacionActual.isBlank() ? "" : observacionActual + "\n")
                            + "Decision RRHH: " + observacion.trim()
            );
        }

        PostulacionModel guardada = postulacionRepository.save(postulacion);
        enviarNotificacionDecision(guardada, cumple);
        return guardada;
    }

    private void validarPerfilListoParaPostulacion(PostulanteModel postulante) {
        if (estaVacio(postulante.getTelefono())
                || estaVacio(postulante.getDireccion())
                || postulante.getFechaNacimiento() == null
                || estaVacio(postulante.getExperienciaLaboral())
                || estaVacio(postulante.getEstudios())) {
            throw new RuntimeException("Completa tus datos del perfil antes de postularte.");
        }

        if (estaVacio(postulante.getCvUrl())) {
            throw new RuntimeException("Para postularte primero tenes que cargar tu CV en PDF.");
        }
    }

    private boolean estaVacio(String value) {
        return value == null || value.isBlank();
    }

    private void enviarNotificacionDecision(PostulacionModel postulacion, boolean cumple) {
        NotificacionWorkflowDTO dto = new NotificacionWorkflowDTO();
        dto.setIdPostulante(postulacion.getPostulante().getId());
        dto.setTipo(cumple ? "RESULTADO_DISPONIBLE" : "RECHAZO_INICIAL");
        dto.setEstado("PENDIENTE_ENVIO");
        dto.setMensaje(cumple
                ? "Tu postulacion continua en el proceso de seleccion."
                : "Tu postulacion no continua en esta busqueda.");
        dto.setDetalle(cumple
                ? "RRHH marco que el CV cumple para el puesto " + postulacion.getPuesto().getNombrePuesto() + "."
                : "RRHH marco que el CV no cumple para el puesto " + postulacion.getPuesto().getNombrePuesto() + ".");
        dto.setDatos(Map.of(
                "idPuesto", postulacion.getPuesto().getId(),
                "puesto", postulacion.getPuesto().getNombrePuesto(),
                "estadoPostulacion", postulacion.getEstado()
        ));

        n8nWorkflowService.enviarNotificacion(dto);
    }
}

package com.safe.service;

import com.safe.dto.EntregaEvaluacionRequestDTO;
import com.safe.dto.RespuestaEvaluacionRequestDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.PostulanteModel;
import com.safe.model.PreguntaModel;
import com.safe.model.RespuestaEvaluacionModel;
import com.safe.model.UsuarioModel;
import com.safe.repository.EvaluacionAsignadaRepository;
import com.safe.repository.PostulanteRepository;
import com.safe.repository.PreguntaRepository;
import com.safe.repository.RespuestaEvaluacionRepository;
import com.safe.repository.UsuarioRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class RespuestaEvaluacionService {

    private final RespuestaEvaluacionRepository respuestaEvaluacionRepository;
    private final EvaluacionAsignadaRepository evaluacionAsignadaRepository;
    private final PreguntaRepository preguntaRepository;
    private final UsuarioRepository usuarioRepository;
    private final PostulanteRepository postulanteRepository;
    private final N8nWorkflowService n8nWorkflowService;

    public RespuestaEvaluacionService(
            RespuestaEvaluacionRepository respuestaEvaluacionRepository,
            EvaluacionAsignadaRepository evaluacionAsignadaRepository,
            PreguntaRepository preguntaRepository,
            UsuarioRepository usuarioRepository,
            PostulanteRepository postulanteRepository,
            N8nWorkflowService n8nWorkflowService) {
        this.respuestaEvaluacionRepository = respuestaEvaluacionRepository;
        this.evaluacionAsignadaRepository = evaluacionAsignadaRepository;
        this.preguntaRepository = preguntaRepository;
        this.usuarioRepository = usuarioRepository;
        this.postulanteRepository = postulanteRepository;
        this.n8nWorkflowService = n8nWorkflowService;
    }

    @Transactional
    public List<RespuestaEvaluacionModel> guardarRespuestas(
            Long idAsignacion,
            String emailUsuario,
            EntregaEvaluacionRequestDTO dto) {

        if (dto == null || dto.getRespuestas() == null || dto.getRespuestas().isEmpty()) {
            throw new IllegalArgumentException("Debe enviar al menos una respuesta");
        }

        EvaluacionAsignadaModel asignacion = evaluacionAsignadaRepository.findById(idAsignacion)
                .orElseThrow(() -> new RuntimeException("Asignacion de evaluacion no encontrada"));
        validarTitularidad(asignacion, emailUsuario);

        List<RespuestaEvaluacionModel> guardadas = new ArrayList<>();
        for (RespuestaEvaluacionRequestDTO item : dto.getRespuestas()) {
            validarRespuesta(item);
            PreguntaModel pregunta = preguntaRepository.findById(item.getIdPregunta())
                    .orElseThrow(() -> new RuntimeException("Pregunta no encontrada"));

            if (!Objects.equals(pregunta.getEvaluacion().getId(), asignacion.getEvaluacion().getId())) {
                throw new IllegalArgumentException("La pregunta no pertenece a la evaluacion asignada");
            }

            RespuestaEvaluacionModel respuesta = respuestaEvaluacionRepository
                    .findByAsignacionIdAndPreguntaId(idAsignacion, item.getIdPregunta())
                    .orElseGet(RespuestaEvaluacionModel::new);

            respuesta.setAsignacion(asignacion);
            respuesta.setPregunta(pregunta);
            respuesta.setRespuesta(item.getRespuesta().trim());
            respuesta.setFechaRespuesta(LocalDateTime.now());
            guardadas.add(respuestaEvaluacionRepository.save(respuesta));
        }

        asignacion.setEstado("RESPONDIDA");
        evaluacionAsignadaRepository.save(asignacion);
        n8nWorkflowService.enviarCorreccionEvaluacion(asignacion);

        return guardadas;
    }

    public List<RespuestaEvaluacionModel> listarPorAsignacion(Long idAsignacion) {
        return respuestaEvaluacionRepository.findByAsignacionId(idAsignacion);
    }

    private void validarTitularidad(EvaluacionAsignadaModel asignacion, String emailUsuario) {
        UsuarioModel usuario = usuarioRepository.findByEmail(emailUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        PostulanteModel postulante = postulanteRepository.findByUsuario(usuario)
                .orElseThrow(() -> new RuntimeException("Perfil de postulante no encontrado"));

        if (!Objects.equals(asignacion.getPostulante().getId(), postulante.getId())) {
            throw new IllegalArgumentException("La evaluacion asignada no pertenece al postulante autenticado");
        }
    }

    private void validarRespuesta(RespuestaEvaluacionRequestDTO item) {
        if (item == null || item.getIdPregunta() == null) {
            throw new IllegalArgumentException("Cada respuesta debe indicar la pregunta");
        }

        if (item.getRespuesta() == null || item.getRespuesta().trim().isEmpty()) {
            throw new IllegalArgumentException("La respuesta no puede estar vacia");
        }
    }
}

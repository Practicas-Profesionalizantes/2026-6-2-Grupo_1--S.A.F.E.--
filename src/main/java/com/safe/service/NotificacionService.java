package com.safe.service;

import com.safe.dto.NotificacionWorkflowDTO;
import com.safe.model.NotificacionModel;
import com.safe.repository.NotificacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;

    public NotificacionService(NotificacionRepository notificacionRepository) {
        this.notificacionRepository = notificacionRepository;
    }

    public NotificacionModel registrar(NotificacionWorkflowDTO dto) {
        NotificacionModel notificacion = new NotificacionModel();
        notificacion.setIdPostulante(dto.getIdPostulante());
        notificacion.setEmail(dto.getEmail());
        notificacion.setNombre(dto.getNombre());
        notificacion.setMensaje(dto.getMensaje());
        notificacion.setTipo(dto.getTipo());
        notificacion.setEstado(dto.getEstado());
        notificacion.setDetalle(dto.getDetalle());
        notificacion.setDatos(convertirDatos(dto));

        return notificacionRepository.save(notificacion);
    }

    public List<NotificacionModel> listarTodas() {
        return notificacionRepository.findAll();
    }

    public List<NotificacionModel> listarPorPostulante(Long idPostulante) {
        return notificacionRepository.findByIdPostulanteOrderByFechaDesc(idPostulante);
    }

    private String convertirDatos(NotificacionWorkflowDTO dto) {
        if (dto.getDatos() == null || dto.getDatos().isEmpty()) {
            return null;
        }

        return dto.getDatos().toString();
    }
}

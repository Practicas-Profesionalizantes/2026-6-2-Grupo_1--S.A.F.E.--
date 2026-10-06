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
        notificacion.setMensaje(dto.getMensaje());
        notificacion.setTipo(dto.getTipo());
        notificacion.setEstado(dto.getEstado());
        notificacion.setDetalle(dto.getDetalle());

        return notificacionRepository.save(notificacion);
    }

    public List<NotificacionModel> listarTodas() {
        return notificacionRepository.findAll();
    }

    public List<NotificacionModel> listarPorPostulante(Long idPostulante) {
        return notificacionRepository.findByIdPostulanteOrderByFechaDesc(idPostulante);
    }
}

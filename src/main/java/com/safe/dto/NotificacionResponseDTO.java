package com.safe.dto;

import com.safe.model.NotificacionModel;

import java.time.LocalDateTime;

public class NotificacionResponseDTO {

    private Long id;
    private Long idPostulante;
    private String mensaje;
    private String tipo;
    private String estado;
    private String detalle;
    private LocalDateTime fecha;

    public NotificacionResponseDTO(NotificacionModel notificacion) {
        this.id = notificacion.getId();
        this.idPostulante = notificacion.getIdPostulante();
        this.mensaje = notificacion.getMensaje();
        this.tipo = notificacion.getTipo();
        this.estado = notificacion.getEstado();
        this.detalle = notificacion.getDetalle();
        this.fecha = notificacion.getFecha();
    }

    public Long getId() {
        return id;
    }

    public Long getIdPostulante() {
        return idPostulante;
    }

    public String getMensaje() {
        return mensaje;
    }

    public String getTipo() {
        return tipo;
    }

    public String getEstado() {
        return estado;
    }

    public String getDetalle() {
        return detalle;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }
}

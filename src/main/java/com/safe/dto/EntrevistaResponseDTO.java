package com.safe.dto;

import com.safe.model.EntrevistaModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class EntrevistaResponseDTO {

    private Long id;
    private Long idPostulante;
    private String nombrePostulante;
    private String emailPostulante;
    private Long idPuesto;
    private String nombrePuesto;
    private LocalDate fecha;
    private LocalTime hora;
    private String modalidad;
    private String ubicacion;
    private String estado;
    private String observaciones;
    private String resultado;
    private LocalDateTime fechaCreacion;

    public EntrevistaResponseDTO(EntrevistaModel entrevista) {
        this.id = entrevista.getId();
        this.idPostulante = entrevista.getPostulante().getId();
        if (entrevista.getPostulante().getUsuario() != null) {
            this.nombrePostulante = entrevista.getPostulante().getUsuario().getNombre();
            this.emailPostulante = entrevista.getPostulante().getUsuario().getEmail();
        }
        if (entrevista.getPuesto() != null) {
            this.idPuesto = entrevista.getPuesto().getId();
            this.nombrePuesto = entrevista.getPuesto().getNombrePuesto();
        }
        this.fecha = entrevista.getFecha();
        this.hora = entrevista.getHora();
        this.modalidad = entrevista.getModalidad();
        this.ubicacion = entrevista.getUbicacion();
        this.estado = entrevista.getEstado();
        this.observaciones = entrevista.getObservaciones();
        this.resultado = entrevista.getResultado();
        this.fechaCreacion = entrevista.getFechaCreacion();
    }

    public Long getId() {
        return id;
    }

    public Long getIdPostulante() {
        return idPostulante;
    }

    public String getNombrePostulante() {
        return nombrePostulante;
    }

    public String getEmailPostulante() {
        return emailPostulante;
    }

    public Long getIdPuesto() {
        return idPuesto;
    }

    public String getNombrePuesto() {
        return nombrePuesto;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public LocalTime getHora() {
        return hora;
    }

    public String getModalidad() {
        return modalidad;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public String getEstado() {
        return estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public String getResultado() {
        return resultado;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }
}

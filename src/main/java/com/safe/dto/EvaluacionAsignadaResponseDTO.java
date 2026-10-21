package com.safe.dto;

import com.safe.model.EvaluacionAsignadaModel;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.math.BigDecimal;

public class EvaluacionAsignadaResponseDTO {
    private Long idPuesto;
    private BigDecimal puntajeTotal;
    private BigDecimal puntajeMaxResultado;
    public Long getIdPuesto() { return idPuesto; }
    public BigDecimal getPuntajeTotal() { return puntajeTotal; }
    public BigDecimal getPuntajeMaxResultado() { return puntajeMaxResultado; }

    private Long id;
    private Integer idEvaluacion;
    private String nombreEvaluacion;
    private String tipoEvaluacion;
    private String descripcionEvaluacion;
    private Integer duracion;
    private BigDecimal puntajeMin;
    private BigDecimal puntajeMax;
    private Long idPostulante;
    private LocalDate fecha;
    private LocalTime horaInicio;
    private LocalTime horaFin;
    private String estado;
    private Integer intento;
    private LocalDateTime fechaAsignacion;
    private String observaciones;

    public EvaluacionAsignadaResponseDTO(EvaluacionAsignadaModel asignacion) {
        this.idPuesto = asignacion.getIdPuesto();
        this.puntajeTotal = asignacion.getPuntajeTotal();
        this.puntajeMaxResultado = asignacion.getPuntajeMaxResultado();
        this.id = asignacion.getId();
        this.idEvaluacion = asignacion.getEvaluacion().getId();
        this.nombreEvaluacion = asignacion.getEvaluacion().getNombre();
        this.tipoEvaluacion = asignacion.getEvaluacion().getTipo();
        this.descripcionEvaluacion = asignacion.getEvaluacion().getDescripcion();
        this.duracion = asignacion.getEvaluacion().getDuracion();
        this.puntajeMin = asignacion.getEvaluacion().getPuntajeMin();
        this.puntajeMax = asignacion.getEvaluacion().getPuntajeMax();
        this.idPostulante = asignacion.getPostulante().getId();
        this.fecha = asignacion.getFecha();
        this.horaInicio = asignacion.getHoraInicio();
        this.horaFin = asignacion.getHoraFin();
        this.estado = asignacion.getEstado();
        this.intento = asignacion.getIntento();
        this.fechaAsignacion = asignacion.getFechaAsignacion();
        this.observaciones = asignacion.getObservaciones();
    }

    public Long getId() {
        return id;
    }

    public Integer getIdEvaluacion() {
        return idEvaluacion;
    }

    public String getNombreEvaluacion() {
        return nombreEvaluacion;
    }

    public String getTipoEvaluacion() {
        return tipoEvaluacion;
    }

    public String getDescripcionEvaluacion() {
        return descripcionEvaluacion;
    }

    public Integer getDuracion() {
        return duracion;
    }

    public BigDecimal getPuntajeMin() {
        return puntajeMin;
    }

    public BigDecimal getPuntajeMax() {
        return puntajeMax;
    }

    public Long getIdPostulante() {
        return idPostulante;
    }

    public LocalDate getFecha() {
        return fecha;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public LocalTime getHoraFin() {
        return horaFin;
    }

    public String getEstado() {
        return estado;
    }

    public Integer getIntento() {
        return intento;
    }

    public LocalDateTime getFechaAsignacion() {
        return fechaAsignacion;
    }

    public String getObservaciones() {
        return observaciones;
    }
}

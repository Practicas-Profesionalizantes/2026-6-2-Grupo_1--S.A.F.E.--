package com.safe.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "evaluacion")
public class Evaluacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 100)
    private String tipo;

    private Integer duracion;

    @Column(name = "puntaje_min", precision = 5, scale = 2)
    private BigDecimal puntajeMin;

    @Column(name = "puntaje_max", precision = 5, scale = 2)
    private BigDecimal puntajeMax;

    @Column(columnDefinition = "TINYINT")
    private Boolean online;

    @Column(name = "id_puesto")
    private Integer idPuesto;

    // Getters y Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public Integer getDuracion() { return duracion; }
    public void setDuracion(Integer duracion) { this.duracion = duracion; }

    public BigDecimal getPuntajeMin() { return puntajeMin; }
    public void setPuntajeMin(BigDecimal puntajeMin) { this.puntajeMin = puntajeMin; }

    public BigDecimal getPuntajeMax() { return puntajeMax; }
    public void setPuntajeMax(BigDecimal puntajeMax) { this.puntajeMax = puntajeMax; }

    public Boolean getOnline() { return online; }
    public void setOnline(Boolean online) { this.online = online; }

    public Integer getIdPuesto() { return idPuesto; }
    public void setIdPuesto(Integer idPuesto) { this.idPuesto = idPuesto; }
}
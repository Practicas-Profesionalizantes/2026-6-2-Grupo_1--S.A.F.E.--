package com.safe.dto;

import java.util.Map;

public class NotificacionWorkflowDTO {

    private Long idPostulante;
    private String email;
    private String nombre;
    private String mensaje;
    private String tipo;
    private String estado;
    private String detalle;
    private Map<String, Object> datos;

    public Long getIdPostulante() {
        return idPostulante;
    }

    public void setIdPostulante(Long idPostulante) {
        this.idPostulante = idPostulante;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getDetalle() {
        return detalle;
    }

    public void setDetalle(String detalle) {
        this.detalle = detalle;
    }

    public Map<String, Object> getDatos() {
        return datos;
    }

    public void setDatos(Map<String, Object> datos) {
        this.datos = datos;
    }
}

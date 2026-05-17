package com.safe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.safe.dto.PostulanteRequestDTO;
import com.safe.model.PostulanteModel;
import com.safe.service.PostulanteService;

@RestController
@RequestMapping("/postulante")
public class PostulanteController {

    @Autowired
    private PostulanteService service;

    // =========================
    // CREAR PERFIL
    // =========================
    @PostMapping("/perfil")
    public ResponseEntity<?> crearPerfil(
            @RequestBody PostulanteRequestDTO dto,
            Authentication authentication) {

        String email = authentication.getName();

        PostulanteModel postulante = service.crear(dto, email);

        return ResponseEntity.ok(postulante);
    }

    // =========================
    // OBTENER MI PERFIL
    // =========================
    @GetMapping("/perfil")
    public ResponseEntity<?> obtenerPerfil(Authentication authentication) {

        String email = authentication.getName();

        PostulanteModel postulante = service.obtenerPorEmail(email);

        return ResponseEntity.ok(postulante);
    }

    // =========================
    // ACTUALIZAR PERFIL
    // =========================
    @PutMapping("/perfil")
    public ResponseEntity<?> actualizarPerfil(
            @RequestBody PostulanteRequestDTO dto,
            Authentication authentication) {

        String email = authentication.getName();

        PostulanteModel actualizado =
                service.actualizar(email, dto);

        return ResponseEntity.ok(actualizado);
    }

    // =========================
    // ELIMINAR PERFIL
    // =========================
    @DeleteMapping("/perfil")
    public ResponseEntity<?> eliminarPerfil(Authentication authentication) {

        String email = authentication.getName();

        service.eliminar(email);

        return ResponseEntity.ok("Perfil eliminado");
    }
}
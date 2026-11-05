package com.safe.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safe.dto.UsuarioResponseDTO;
import com.safe.model.UsuarioModel;
import com.safe.service.UsuarioService;

@RestController
@RequestMapping("/admin/usuarios")
public class AdminUsuarioController {

    private final UsuarioService usuarioService;

    public AdminUsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> listarUsuarios() {
        List<UsuarioResponseDTO> usuarios = usuarioService.listarTodos().stream()
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(Map.of(
                "status", "ok",
                "data", usuarios
        ));
    }

    @PatchMapping("/{id}/rol")
    public ResponseEntity<Map<String, Object>> cambiarRol(
            @PathVariable Long id,
            @RequestBody Map<String, String> data) {
        try {
            String emailActual = (String) SecurityContextHolder.getContext()
                    .getAuthentication()
                    .getPrincipal();
            UsuarioModel usuario = usuarioService.cambiarRol(
                    id,
                    data.get("rol"),
                    emailActual
            );
            return ResponseEntity.ok(Map.of(
                    "status", "ok",
                    "message", "Rol actualizado correctamente",
                    "data", toDto(usuario)
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "status", "error",
                    "message", e.getMessage()
            ));
        }
    }

    private UsuarioResponseDTO toDto(UsuarioModel usuario) {
        return new UsuarioResponseDTO(
                usuario.getId(),
                usuario.getDni(),
                usuario.getNombre(),
                usuario.getEmail(),
                usuario.getRol()
        );
    }
}

package com.safe.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.safe.dto.LoginDTO;
import com.safe.dto.RegisterDTO;
import com.safe.model.UsuarioModel;
import com.safe.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public Object register(@RequestBody RegisterDTO data) {
        UsuarioModel user = service.register(data.getEmail(), data.getPassword());

        return Map.of(
                "status", "ok",
                "message", "Usuario registrado",
                "data", user
        );
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginDTO data) {
        UsuarioModel user = service.login(data.getEmail(), data.getPassword());

        if (user != null) {
            return Map.of("status", "ok", "message", "Login correcto");
        }

        return Map.of("status", "error", "message", "Credenciales inválidas");
    }
}
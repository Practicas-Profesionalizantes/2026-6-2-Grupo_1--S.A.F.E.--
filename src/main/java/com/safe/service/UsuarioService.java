package com.safe.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.safe.config.JwtUtil;
import com.safe.model.UsuarioModel;
import com.safe.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UsuarioService(UsuarioRepository repo, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public UsuarioModel register(String dni, String nombre, String email, String password) {

        // 🔒 VALIDACIONES
        if (repo.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }

        if (repo.existsByDni(dni)) {
            throw new RuntimeException("El DNI ya está registrado");
        }

        UsuarioModel user = new UsuarioModel();
        user.setDni(dni);
        user.setNombre(nombre);
        user.setEmail(email);

        // 🔐 ENCRIPTAR CONTRASEÑA
        user.setContrasena(passwordEncoder.encode(password));

        user.setRol("postulante");

        return repo.save(user);
    }

    // 🔐 LOGIN CON JWT
    public String login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> passwordEncoder.matches(password, u.getContrasena()))
                .map(u -> jwtUtil.generateToken(u.getEmail(), u.getRol()))
                .orElse(null);
    }
    public UsuarioModel findByEmail(String email) {
        return repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    public void cambiarContrasena(String email, String actual, String nueva) {
        if (nueva == null || nueva.isBlank() || nueva.length() < 8) {
            throw new RuntimeException("La nueva contrasena debe tener al menos 8 caracteres");
        }
        UsuarioModel usuario = findByEmail(email);
        if (!passwordEncoder.matches(actual, usuario.getContrasena())) {
            throw new RuntimeException("La contrasena actual no es correcta");
        }
        usuario.setContrasena(passwordEncoder.encode(nueva));
        repo.save(usuario);
    }
}

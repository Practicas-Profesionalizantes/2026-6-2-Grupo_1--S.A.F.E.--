package com.safe.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

import com.safe.config.JwtUtil;
import com.safe.model.UsuarioModel;
import com.safe.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final String adminBootstrapSecret;

    public UsuarioService(
            UsuarioRepository repo,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            @Value("${safe.admin.bootstrap-secret:}") String adminBootstrapSecret) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.adminBootstrapSecret = adminBootstrapSecret;
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

    public List<UsuarioModel> listarTodos() {
        return repo.findAll();
    }

    public UsuarioModel cambiarRol(Long id, String rol, String emailActual) {
        String nuevoRol = rol == null ? "" : rol.trim().toLowerCase();
        if (!nuevoRol.equals("admin") && !nuevoRol.equals("rrhh") && !nuevoRol.equals("postulante")) {
            throw new IllegalArgumentException("El rol debe ser ADMIN, RRHH o POSTULANTE");
        }

        UsuarioModel usuario = repo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        String rolActual = usuario.getRol() == null ? "" : usuario.getRol().toLowerCase();

        if (rolActual.equals("admin") && !nuevoRol.equals("admin") && repo.countByRolIgnoreCase("admin") <= 1) {
            throw new IllegalArgumentException("No se puede quitar el ultimo administrador");
        }

        if (usuario.getEmail().equalsIgnoreCase(emailActual) && !nuevoRol.equals("admin")) {
            throw new IllegalArgumentException("No podes quitarte tu propio rol de administrador");
        }

        usuario.setRol(nuevoRol);
        return repo.save(usuario);
    }

    public UsuarioModel bootstrapAdmin(String email, String secret) {
        if (adminBootstrapSecret == null || adminBootstrapSecret.isBlank()) {
            throw new IllegalStateException("El alta inicial de administrador no esta configurada");
        }
        if (secret == null || !MessageDigest.isEqual(
                adminBootstrapSecret.getBytes(StandardCharsets.UTF_8),
                secret.getBytes(StandardCharsets.UTF_8))) {
            throw new IllegalArgumentException("Clave de alta inicial invalida");
        }
        if (repo.countByRolIgnoreCase("admin") > 0) {
            throw new IllegalStateException("Ya existe un administrador; usa el panel de usuarios");
        }

        UsuarioModel usuario = findByEmail(email);
        usuario.setRol("admin");
        return repo.save(usuario);
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

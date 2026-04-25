package com.safe.service;

import org.springframework.stereotype.Service;

import com.safe.model.UsuarioModel;
import com.safe.repository.UsuarioRepository;

@Service
public class UsuarioService {

    private final UsuarioRepository repo;

    public UsuarioService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public UsuarioModel register(String email, String password) {
        UsuarioModel user = new UsuarioModel();
        user.setEmail(email);
        user.setPassword(password);

        return repo.save(user);
    }

    public UsuarioModel login(String email, String password) {
        return repo.findByEmail(email)
                .filter(u -> u.getPassword().equals(password))
                .orElse(null);
    }
}
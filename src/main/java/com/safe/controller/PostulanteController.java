package com.safe.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.safe.dto.PostulanteRequestDTO;
import com.safe.dto.PostulanteResponseDTO;
import com.safe.model.PostulanteModel;
import com.safe.service.PostulanteService;

@RestController
@RequestMapping("/postulante")
public class PostulanteController {

    @Autowired
    private PostulanteService service;

    @PostMapping("/perfil")
    public ResponseEntity<PostulanteResponseDTO> crearPerfil(
            @RequestBody PostulanteRequestDTO dto,
            Authentication authentication) {

        String email = authentication.getName();
        PostulanteModel postulante = service.crear(dto, email);

        return ResponseEntity.ok(new PostulanteResponseDTO(postulante));
    }

    @GetMapping("/perfil")
    public ResponseEntity<PostulanteResponseDTO> obtenerPerfil(Authentication authentication) {
        String email = authentication.getName();
        PostulanteModel postulante = service.obtenerPorEmail(email);

        return ResponseEntity.ok(new PostulanteResponseDTO(postulante));
    }

    @PutMapping("/perfil")
    public ResponseEntity<PostulanteResponseDTO> actualizarPerfil(
            @RequestBody PostulanteRequestDTO dto,
            Authentication authentication) {

        String email = authentication.getName();
        PostulanteModel actualizado = service.actualizar(email, dto);

        return ResponseEntity.ok(new PostulanteResponseDTO(actualizado));
    }

    @PostMapping(value = "/perfil/cv", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PostulanteResponseDTO> subirCv(
            @RequestParam("archivo") MultipartFile archivo,
            Authentication authentication) {

        String email = authentication.getName();
        PostulanteModel actualizado = service.subirCv(email, archivo);

        return ResponseEntity.ok(new PostulanteResponseDTO(actualizado));
    }

    @DeleteMapping("/perfil")
    public ResponseEntity<String> eliminarPerfil(Authentication authentication) {
        String email = authentication.getName();
        service.eliminar(email);

        return ResponseEntity.ok("Perfil eliminado");
    }
}

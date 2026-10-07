package com.safe.controller;

import com.safe.service.ArchivoService;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArchivoController {

    private final ArchivoService archivoService;

    public ArchivoController(ArchivoService archivoService) {
        this.archivoService = archivoService;
    }

    @GetMapping("/archivos/cv/{nombreArchivo:.+}")
    public ResponseEntity<Resource> obtenerCv(@PathVariable String nombreArchivo) {
        Resource archivo = archivoService.cargarCv(nombreArchivo);
        String contentType = archivoService.detectarContentType(nombreArchivo);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + nombreArchivo + "\"")
                .body(archivo);
    }
}

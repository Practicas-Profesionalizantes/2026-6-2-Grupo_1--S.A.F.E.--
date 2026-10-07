package com.safe.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Set;
import java.util.UUID;

@Service
public class ArchivoService {

    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "application/pdf",
            "image/jpeg",
            "image/png",
            "image/webp"
    );

    private final Path cvStoragePath;

    public ArchivoService(@Value("${safe.uploads.dir:uploads}") String uploadsDir) {
        this.cvStoragePath = Paths.get(uploadsDir).toAbsolutePath().normalize().resolve("cv");
    }

    public String guardarCv(MultipartFile archivo) {
        validarArchivo(archivo);

        try {
            Files.createDirectories(cvStoragePath);

            String extension = obtenerExtension(archivo.getOriginalFilename(), archivo.getContentType());
            String nombreArchivo = UUID.randomUUID() + extension;
            Path destino = cvStoragePath.resolve(nombreArchivo).normalize();

            if (!destino.startsWith(cvStoragePath)) {
                throw new IllegalArgumentException("Nombre de archivo invalido");
            }

            Files.copy(archivo.getInputStream(), destino, StandardCopyOption.REPLACE_EXISTING);

            return nombreArchivo;
        } catch (IOException e) {
            throw new RuntimeException("No se pudo guardar el CV", e);
        }
    }

    public Resource cargarCv(String nombreArchivo) {
        try {
            Path archivo = cvStoragePath.resolve(nombreArchivo).normalize();

            if (!archivo.startsWith(cvStoragePath)) {
                throw new IllegalArgumentException("Nombre de archivo invalido");
            }

            Resource resource = new UrlResource(archivo.toUri());
            if (!resource.exists() || !resource.isReadable()) {
                throw new RuntimeException("Archivo no encontrado");
            }

            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("Archivo no encontrado", e);
        }
    }

    public String detectarContentType(String nombreArchivo) {
        try {
            Path archivo = cvStoragePath.resolve(nombreArchivo).normalize();
            String contentType = Files.probeContentType(archivo);
            return contentType != null ? contentType : "application/octet-stream";
        } catch (IOException e) {
            return "application/octet-stream";
        }
    }

    private void validarArchivo(MultipartFile archivo) {
        if (archivo == null || archivo.isEmpty()) {
            throw new IllegalArgumentException("El archivo CV es obligatorio");
        }

        if (archivo.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("El archivo CV no puede superar 10MB");
        }

        String contentType = archivo.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType)) {
            throw new IllegalArgumentException("El CV debe ser PDF, JPG, PNG o WEBP");
        }
    }

    private String obtenerExtension(String originalFilename, String contentType) {
        if (originalFilename != null && originalFilename.contains(".")) {
            String extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            if (extension.matches("\\.(pdf|jpg|jpeg|png|webp)")) {
                return extension;
            }
        }

        return switch (contentType) {
            case "application/pdf" -> ".pdf";
            case "image/jpeg" -> ".jpg";
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            default -> ".bin";
        };
    }
}

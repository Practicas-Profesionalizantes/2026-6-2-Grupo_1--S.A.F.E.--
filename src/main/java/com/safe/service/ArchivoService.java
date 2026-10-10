package com.safe.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;

import java.io.IOException;
import java.io.InputStream;
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
    private static final int MAX_EXTRACTED_TEXT_LENGTH = 8000;
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
            "application/pdf"
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

    public ResultadoExtraccionCv extraerTextoCv(MultipartFile archivo) {
        validarArchivo(archivo);

        String contentType = archivo.getContentType();
        if ("application/pdf".equals(contentType)) {
            return extraerTextoPdf(archivo);
        }

        return new ResultadoExtraccionCv(null, "NO_SOPORTADO", "Tipo de archivo no soportado para extraccion de texto.");
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
            throw new IllegalArgumentException("El CV debe ser un archivo PDF con texto seleccionable");
        }
    }

    private String obtenerExtension(String originalFilename, String contentType) {
        if (originalFilename != null && originalFilename.contains(".")) {
            String extension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
            if (extension.equals(".pdf")) {
                return extension;
            }
        }

        return switch (contentType) {
            case "application/pdf" -> ".pdf";
            default -> ".bin";
        };
    }

    private ResultadoExtraccionCv extraerTextoPdf(MultipartFile archivo) {
        try (InputStream inputStream = archivo.getInputStream();
             PDDocument document = Loader.loadPDF(inputStream.readAllBytes())) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = limpiarTexto(stripper.getText(document));

            if (text.isBlank()) {
                return new ResultadoExtraccionCv(
                        null,
                        "SIN_TEXTO",
                        "El PDF no contiene texto seleccionable. Puede ser un escaneo y requerir OCR."
                );
            }

            return new ResultadoExtraccionCv(limitarTexto(text), "TEXTO_EXTRAIDO", null);
        } catch (IOException e) {
            return new ResultadoExtraccionCv(
                    null,
                    "ERROR_EXTRACCION",
                    "No se pudo extraer texto del PDF: " + e.getMessage()
            );
        }
    }

    private String limpiarTexto(String value) {
        if (value == null) {
            return "";
        }

        return value
                .replace('\u0000', ' ')
                .replaceAll("[\\t\\x0B\\f\\r]+", " ")
                .replaceAll(" +", " ")
                .replaceAll("\\n{3,}", "\n\n")
                .trim();
    }

    private String limitarTexto(String value) {
        if (value.length() <= MAX_EXTRACTED_TEXT_LENGTH) {
            return value;
        }

        return value.substring(0, MAX_EXTRACTED_TEXT_LENGTH);
    }

    public record ResultadoExtraccionCv(String texto, String estado, String observacion) {
    }
}

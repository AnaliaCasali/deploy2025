package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.ImagenDTO;
import com.backend.ISP63.dto.ImagenFileDTO;
import com.backend.ISP63.model.Imagen;
import com.backend.ISP63.repository.ImagenRepository;
import com.backend.ISP63.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
 import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ImagenServiceImpl implements ImagenService {
    @Autowired
    private ImagenRepository imagenRepository;

    @Value("${upload.path}")
    private String uploadPath;


    @Override
    public List<ImagenDTO> getAll() {

        return imagenRepository.findAll()
                .stream()
                .map(e -> new ImagenDTO(e.getId(), e.getUrl(), e.getAlt(), e.getNombre()))
                .collect(Collectors.toList());
    }

@Override
    public List<ImagenFileDTO> getAllFile() {

        return imagenRepository.findAll()
                .stream()
                .map(e ->new ImagenFileDTO(
                        e.getId(),
                        e.getUrl(),
                        e.getAlt(),
                        e.getNombre(),
                        this.getFile(e.getId()) // Aquí ya estás obteniendo el byte[]
                ))
                .collect(Collectors.toList());
    }
@Override
    public byte[] getFile(Integer id) {
        Optional<Imagen> imagen = imagenRepository.findById(id);
        if (imagen.isPresent()) {
            File file = new File(imagen.get().getUrl().replace("/uploads/", uploadPath));
            byte[] bytes = null;

            try {
                bytes = Files.readAllBytes(file.toPath());
            } catch (IOException e) {
                throw new RuntimeException("Error al leer el archivo: " + e.getMessage());
            }

            return bytes;
        } else {
return null;        }
    }

    @Override
    public ImagenDTO findById(Integer id) throws Exception {
        Imagen e = imagenRepository.findById(id)
                .orElseThrow(() -> new Exception("Imagen con id " + id + " no encontrada"));

        ImagenDTO imagenDTO = new ImagenDTO(e.getId(), e.getUrl(), e.getAlt(), e.getNombre());
        return imagenDTO;
    }

    @Override
    public File getArchivoImagen(Integer id) {
        Optional<Imagen> imagenOptional = imagenRepository.findById(id);

        if (imagenOptional.isEmpty()) {
            return null;
        }

        Imagen imagen = imagenOptional.get();
        File file = new File(imagen.getUrl().replace("/uploads/", uploadPath)); // Reemplaza '/uploads/' con el path en el servidor

        return file;
    }


    @Override
    public ImagenDTO saveImagen(MultipartFile file, String alt) throws IOException {

        if (file.isEmpty()) {
            throw new IllegalArgumentException("El archivo está vacío");
        }

        String contentType = file.getContentType();
        if (!Arrays.asList("image/jpeg", "image/png", "image/gif").contains(contentType)) {
            throw new IllegalArgumentException("Solo están permitidas imágenes JPEG, PNG y GIF");
        }

        // Directorio de uploads, asegurándote que sea accesible públicamente
        String dir = uploadPath;  // Path a tu directorio de imágenes públicas (e.g., "./uploads/")

        // Crear un nombre de archivo único
        String fileName = file.getOriginalFilename();
        String nombreArchivoUnico = UUID.randomUUID().toString() + "_" + fileName;

        // Guardar la imagen en el directorio de uploads
        try {
            byte[] bytes = file.getBytes();
            Path path = Paths.get(dir + nombreArchivoUnico);
            Files.write(path, bytes);
        } catch (IOException e) {
            throw new IOException("Error al guardar el archivo", e);
        }

        // Generar la URL pública basada en la ruta estática configurada en Spring Boot
        String publicUrl = "/uploads/" + nombreArchivoUnico;

        // Guardar la imagen y su URL en la base de datos
        Imagen imagen = new Imagen();
        imagen.setUrl(publicUrl);
        imagen.setNombre(nombreArchivoUnico);
        imagen.setAlt(alt);
        imagenRepository.save(imagen);

        // Devolver el DTO con la URL pública
        ImagenDTO imagenDTO = new ImagenDTO(
                imagen.getId(),
                imagen.getUrl(),
                imagen.getAlt(),
                imagen.getNombre()
        );

        return imagenDTO;
    }

    public Imagen getById( Integer id) {
        return  imagenRepository.findById(id).orElseThrow();
    }
}
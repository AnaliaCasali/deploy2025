package com.backend.ISP63.controller;

import com.backend.ISP63.dto.NoticiaDTO;
import com.backend.ISP63.service.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping()
public class NoticiaController {

    @Autowired
    private NoticiaService noticiaService;

    // Obtener todas las noticias
    @GetMapping("/auth/noticias")
    public ResponseEntity<List<NoticiaDTO>> findAll() {
        try {
            List<NoticiaDTO> listado = noticiaService.findAll();
            return new ResponseEntity<>(listado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Obtener noticia por ID
    @GetMapping("/auth/noticias/{id}")
    public ResponseEntity<NoticiaDTO> findById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(noticiaService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Actualizar/editar noticia
    @PutMapping("/api/noticias/{id}")
    public ResponseEntity<NoticiaDTO> editNoticia(@PathVariable Integer id, @RequestBody NoticiaDTO noticiaDTO) {
        return ResponseEntity.ok(noticiaService.patchnoticia(id, noticiaDTO));

    }


    // Eliminar noticia
    @DeleteMapping("/api/noticias/{id}")
    public ResponseEntity<Map<String, String>> deleteNoticia(@PathVariable Integer id) {
        Map<String, String> response = new HashMap<>();
        try {
            noticiaService.delete(id);
            response.put("message", "Se eliminó la noticia con id " + id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
        } catch (Exception e) {
            response.put("message", "No se encontró la noticia con id " + id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // Guardar noticia
    @PostMapping("/api/noticias")
    public ResponseEntity<NoticiaDTO> save(@RequestBody NoticiaDTO noticiaDTO) {
        try {

            NoticiaDTO response = noticiaService.save(noticiaDTO);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            // Manejar errores específicos como parámetros inválidos
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (Exception e) {
            // Captura cualquier otro tipo de excepción
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}

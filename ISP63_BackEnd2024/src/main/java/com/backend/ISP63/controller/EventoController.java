package com.backend.ISP63.controller;

import com.backend.ISP63.dto.EventoDTO;
import com.backend.ISP63.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class EventoController {
    @Autowired
    private EventoService eventoService;

    @GetMapping("/auth/eventos")
    public ResponseEntity<List<EventoDTO>> findAll() {
        try {
            List<EventoDTO> eventos = eventoService.findAll();
            return new ResponseEntity<>(eventos, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/auth/eventos/{id}")
    public ResponseEntity<EventoDTO> findById(@PathVariable Long id) {
        try {
            EventoDTO evento = eventoService.findById(id);
            return new ResponseEntity<>(evento, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/api/eventos")
    public ResponseEntity<EventoDTO> saveEvento(@RequestBody EventoDTO eventoDTO) {
        try {
            EventoDTO nuevoEvento = eventoService.save(eventoDTO);
            return new ResponseEntity<>(nuevoEvento, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/api/eventos/{id}")
    public ResponseEntity<EventoDTO> updateEvento(@PathVariable Long id, @RequestBody EventoDTO eventoDTO) {
        try {
            EventoDTO eventoActualizado = eventoService.patchEvento(id, eventoDTO);
            return new ResponseEntity<>(eventoActualizado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/api/eventos/{id}")
    public ResponseEntity<String> deleteEvento(@PathVariable Long id) {
        try {
            eventoService.delete(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Evento con id " + id + " eliminado correctamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró el evento con id " + id);
        }
    }
}

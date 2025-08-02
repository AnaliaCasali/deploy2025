package com.backend.ISP63.controller;

import com.backend.ISP63.dto.TurnoDTO;
import com.backend.ISP63.model.Turno;
import com.backend.ISP63.service.TurnoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/turnos")
public class TurnoController {

    @Autowired
    TurnoService turnoService;


    @GetMapping
    public ResponseEntity<List<TurnoDTO>> findAll() {
        try {
            List<TurnoDTO> response = turnoService.findAll();

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    /*@GetMapping("/recientes")
    public ResponseEntity<List<Turno>> findAllTurnosRecientes() {
        try{
            List<Turno> turnosRecientes = turnoService.findAllTurnosRecientes();
            return new ResponseEntity<>(turnosRecientes, HttpStatus.OK);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }*/


    @GetMapping("/{id}")
    public ResponseEntity<TurnoDTO> findById(@PathVariable Long id) throws Exception {
        try {
            TurnoDTO response = turnoService.findById(id);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public ResponseEntity<TurnoDTO> saveTurno(@RequestBody TurnoDTO turnoDTO) {
        return ResponseEntity.ok(turnoService.save(turnoDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TurnoDTO> editar(@PathVariable Long id, @RequestBody TurnoDTO turnoDTO) {
        try {
            TurnoDTO turnoActualizado = turnoService.editar(id, turnoDTO);
            return ResponseEntity.ok(turnoActualizado);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            turnoService.delete(id);
            return new ResponseEntity<>("Se borro el turno con id" + id,HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontro el turno con id" + id);
        }
    }

}


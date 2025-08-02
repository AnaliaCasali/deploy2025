package com.backend.ISP63.controller;

import com.backend.ISP63.dto.AsignaturaDTO;
import com.backend.ISP63.dto.AsignaturaFiltroGetDTO;
import com.backend.ISP63.dto.AsignaturaGetDTO;
import com.backend.ISP63.exceptions.ResourceNotFoundException;
import com.backend.ISP63.service.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/asignatura")
public class AsignaturaController {

    @Autowired
    AsignaturaService asignaturaService;

    @PostMapping("/api/asignatura")
    public AsignaturaDTO save(@RequestBody AsignaturaDTO AsignaturaDTO) {
        try {
            return asignaturaService.post(AsignaturaDTO);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    //funciona
    @GetMapping
    public ResponseEntity<List<AsignaturaGetDTO>> findAll() {
        try {
            List<AsignaturaGetDTO> response = asignaturaService.findAll();
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @GetMapping("/carrera/{carreraId}")
    public ResponseEntity<List<AsignaturaGetDTO>> findByCarreraId(@PathVariable Integer carreraId) {
        try {
            List<AsignaturaGetDTO> response = asignaturaService.findByCarreraId(carreraId);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    //funciona
    @GetMapping("/{id}")
    public ResponseEntity<AsignaturaGetDTO> findById(@PathVariable Integer id) {
        try {
            AsignaturaGetDTO response = asignaturaService.findById(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    //funciona
    @GetMapping("/datosminimos")
    public ResponseEntity<List<AsignaturaGetDTO>> findAllAsignaturas() {
        try {
            List<AsignaturaGetDTO> response = asignaturaService.findAllMin();
            return new ResponseEntity<>(response , HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @PutMapping("/api/asignatura/{id}")
    public AsignaturaDTO update(@PathVariable Long id, @RequestBody AsignaturaDTO AsignaturaDTO) {

        return null;
    }

    @DeleteMapping("/api/asignatura/{id}")
    public void delete(@PathVariable Integer id) {
        try {
            asignaturaService.delete(id);
        } catch (ResourceNotFoundException e) {
            throw new RuntimeException(e);
        }

    }
    /*@GetMapping("/auth/asignatura/{id}")
    public ResponseEntity<AsignaturaDTO> findById(@PathVariable Integer id) {
        try {
            Optional<AsignaturaDTO> asignatura =
                    Optional.ofNullable(asignaturaService.findById(id));
            return new ResponseEntity<>(asignatura.get(), HttpStatus.OK);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }*/

    @GetMapping("/por-carrera/{carreraId}/anio/{anio}")
    public ResponseEntity<List<AsignaturaFiltroGetDTO>> getAsignaturasPorCarreraYAnio(
            @PathVariable int carreraId, @PathVariable int anio) {
        List<AsignaturaFiltroGetDTO> asignaturas = asignaturaService.findAsignaturasByCarreraAndAnio(carreraId, anio);
        return new ResponseEntity<>(asignaturas, HttpStatus.OK);
    }

}

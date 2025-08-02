package com.backend.ISP63.controller;
import com.backend.ISP63.dto.*;

import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.service.InscripcionMesaExamenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/inscripcionmesasexamen")
public class InscripcionMesaExamenController {

    @Autowired
    InscripcionMesaExamenService inscripcionMesaExamenService;



    @GetMapping()
    public ResponseEntity<List<InscripcionMesaExamenDTO>> findAll() {
        try {
            List<InscripcionMesaExamenDTO> response = inscripcionMesaExamenService.findAll();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<InscripcionMesaExamenDTO> findById(@PathVariable Long id) throws Exception {
        InscripcionMesaExamenDTO response = inscripcionMesaExamenService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<InscripcionMesaExamen> createInscripcion(@RequestBody InscripcionMesaExamen inscripcion) {
        InscripcionMesaExamen savedInscripcion = inscripcionMesaExamenService.save(inscripcion);
        return new ResponseEntity<>(savedInscripcion, HttpStatus.CREATED);
    }



    @PostMapping("/guardar")
    public InscripcionMesaExamenSaveDTO save(@RequestBody InscripcionMesaExamenSaveDTO inscripcionMesaExamenSaveDTO) throws Exception {
        return inscripcionMesaExamenService.save(inscripcionMesaExamenSaveDTO);
    }


    @GetMapping("/lista-inscriptos")

    public ResponseEntity<List<InscripcionMesaExamenGetDTO>> obtenerInscriptos() {
        try {
            List<InscripcionMesaExamenGetDTO> inscriptos = inscripcionMesaExamenService.obtenerInscriptos();
            return ResponseEntity.ok(inscriptos);
        } catch (Exception e) {

            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/lista-inscriptos-aceptados")
    public ResponseEntity<List<InscripcionMesaExamenGetDTO>> obtenerInscriptosAceptados() {
        try {
            List<InscripcionMesaExamenGetDTO> inscriptos = inscripcionMesaExamenService.obtenerInscriptosAceptados();
            return ResponseEntity.ok(inscriptos);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

package com.backend.ISP63.controller;

import com.backend.ISP63.dto.*;

import com.backend.ISP63.service.MesaExamenService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mesas-examen")
public class MesaExamenController {
    @Autowired
    MesaExamenService mesaExamenService;

    // Método GET para obtener todas las mesas de examen
    @GetMapping("/")
    public ResponseEntity<List<MesaExamenDTO>> getAll() {
        List<MesaExamenDTO> mesasExamen = mesaExamenService.getAll();
        return ResponseEntity.ok(mesasExamen);
    }
    //metodo para buscar mesa de examen por id NO FUNCIONA
    @GetMapping("/{id}")
    public ResponseEntity<MesaExamenDTO> findById(@PathVariable Long id) {
        try {
            MesaExamenDTO response = mesaExamenService.findById(id);
            return new ResponseEntity<>(response, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Método GET para obtener mesas de examen por turno FUNCIONA
    @GetMapping("/turno/{id}")
    public ResponseEntity<MesaExamenPostDTO> findByTurno(@PathVariable Long id) {
        try{
            MesaExamenPostDTO response = mesaExamenService.findByTurno(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @PostMapping
    public MesaExamenPostDTO save(@RequestBody MesaExamenPostDTO mesaExamenPostDTO) {
        return mesaExamenService.save(mesaExamenPostDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MesaExamenPostDTO> put(@PathVariable Long id, @RequestBody MesaExamenPostDTO mesaExamenPostDTO) {
        try {
            MesaExamenPostDTO mesaExamenActualizada = mesaExamenService.put(id, mesaExamenPostDTO);
            return ResponseEntity.ok(mesaExamenActualizada);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        try {
            mesaExamenService.delete(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).
                    body("Se borro la mesa de examen con id" + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontro la mesa de examen con id" + id);
        }
    }

    /*@PutMapping("/{id}")
    public ResponseEntity<MesaExamenDTO> patch(@PathVariable Long id,
                                                  @RequestBody MesaExamenDTO mesaExamenDTO) {

        return ResponseEntity.ok(mesaExamenService.patch(id, mesaExamenDTO));
    }*/

    @GetMapping("/mesas")
    public ResponseEntity<List<MesaExamenListGetDTO>> getAllMesas() throws Exception {
        List<MesaExamenListGetDTO> mesas = mesaExamenService.findAllMesas();
        return new ResponseEntity<>(mesas, HttpStatus.OK);
    }

    // mesas disponisbles por alumno
    @GetMapping("/disponibles/{dni}")
    public ResponseEntity<List<MesaExamenListGetDTO>> findMesasExamenDisponibles(@PathVariable String dni) {
        try {
            List<MesaExamenListGetDTO> mesasDisponibles = mesaExamenService.findMesasExamenDisponibles(dni);
            return new ResponseEntity<>(mesasDisponibles, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}

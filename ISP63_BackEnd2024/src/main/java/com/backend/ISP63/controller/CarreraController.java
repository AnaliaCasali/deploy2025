package com.backend.ISP63.controller;
import com.backend.ISP63.dto.CarreraDTO;
import com.backend.ISP63.dto.CarreraDTOconFile;
import com.backend.ISP63.dto.CarreraGetDTO;
import com.backend.ISP63.service.CarreraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping
public class CarreraController {

    @Autowired
    private CarreraService carreraService;

    @GetMapping("/auth/carreras")
    public ResponseEntity<List<CarreraDTO>> findAll() {
        try {
            List<CarreraDTO> listado = carreraService.findAll();
            return new ResponseEntity<>(listado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }
    @GetMapping("/auth/carreras/datosminimos")
    public ResponseEntity<List<CarreraGetDTO>> findAllMin() {
        try {
            List<CarreraGetDTO> listado = carreraService.findAllMin();
            return new ResponseEntity<>(listado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @GetMapping("/auth/carreras/{id}")
    public ResponseEntity<CarreraDTO> findById(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(carreraService.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    /*
        @PostMapping
        public ResponseEntity<CarreraDTO> saveCarrera
                (@RequestBody CarreraDTO carreraDTO) {
            return ResponseEntity.ok(carreraService.save(carreraDTO));
        }
    */
    @PutMapping("/api/carreras/{id}")
    public ResponseEntity<CarreraDTO> editCarrera(@PathVariable Integer id,
                                                  @RequestBody CarreraDTO carreraDTO) {
        return ResponseEntity.ok(carreraService.patchCarrera(id, carreraDTO));
    }

    @DeleteMapping("/api/carreras/{id}")
    public ResponseEntity<String> deleteCarrera(@PathVariable Integer id) {
        try {
            carreraService.delete(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body("Se borro la carrera con id" + id);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No se encontro la carrera con id" + id);
        }
    }


    @PostMapping("/api/carreras")
    public ResponseEntity<CarreraDTO> save(@RequestBody CarreraDTO carreraDTO) {
        try {

            CarreraDTO response = carreraService.save(carreraDTO);
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
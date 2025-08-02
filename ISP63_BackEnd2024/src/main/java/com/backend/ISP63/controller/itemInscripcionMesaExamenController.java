package com.backend.ISP63.controller;

import com.backend.ISP63.dto.ItemInscripcionMesaExamenDTO;
import com.backend.ISP63.dto.ItemInscripcionMesaExamenNewEstadoDTO;
import com.backend.ISP63.dto.ItemInscripcionMesaExamenNotasDTO;
import com.backend.ISP63.dto.ItemInscripcionMesaExamenNotasGetDTO;
import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.model.ItemInscripcionMesaExamen;
import com.backend.ISP63.service.ItemInscripcionMesaExamenService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/itemsinscripcionmesas")
public class itemInscripcionMesaExamenController {

    @Autowired
    ItemInscripcionMesaExamenService itemInscripcionMesaExamenService;

    @GetMapping("/")
    public ResponseEntity<List<ItemInscripcionMesaExamenDTO>> findAll() {
        try {
            List<ItemInscripcionMesaExamenDTO> response = itemInscripcionMesaExamenService.findAll();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ItemInscripcionMesaExamenDTO> findById(@PathVariable Long id) throws Exception {
        try {
        ItemInscripcionMesaExamenDTO response = itemInscripcionMesaExamenService.findById(id);
        return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/cambiarEstado")
    public ResponseEntity<Void> updateEstado(@RequestBody ItemInscripcionMesaExamenNewEstadoDTO estadosInsc) {
        List<Long> aceptados = estadosInsc.getAceptados();
        List<Long> rechazados = estadosInsc.getRechazados();

        try {
            for (Long id : aceptados) {
                itemInscripcionMesaExamenService.updateEstado(id, EstadoInscripcion.APROBADO);
            }
            for (Long id : rechazados) {
                itemInscripcionMesaExamenService.updateEstado(id, EstadoInscripcion.RECHAZADO);
            }
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Filtrar ítems por asignatura y turno de examen
    @GetMapping("/filtroAsignaturaTurno")
    public ResponseEntity<List<ItemInscripcionMesaExamen>> getItemsByAsignaturaAndTurno(
            @RequestParam Long idAsignatura, @RequestParam Long idTurno) {
        List<ItemInscripcionMesaExamen> items = itemInscripcionMesaExamenService.findByAsignaturaAndTurno(idAsignatura, idTurno);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }

    //probar postman  GET http://localhost:8080/api/itemsinscripcionmesas/filtroAsignaturaTurno?idAsignatura=1&idTurno=2

    // Filtrar ítems por dniEstudiante (String) e idTurno
    @GetMapping("/filtroAlumnoTurno")
    public ResponseEntity<List<ItemInscripcionMesaExamen>> getItemsByEstudianteAndTurno(
            @RequestParam String dniEstudiante, @RequestParam Long idTurno) {
        List<ItemInscripcionMesaExamen> items = itemInscripcionMesaExamenService.findByEstudianteAndTurno(dniEstudiante, idTurno);
        return new ResponseEntity<>(items, HttpStatus.OK);
    }
    //GET http://localhost:8080/api/itemsinscripcionmesas/filtroAlumnoTurno?idEstudiante=12345&idTurno=2

    @PostMapping
    public ItemInscripcionMesaExamenDTO save(@RequestBody ItemInscripcionMesaExamenDTO itemInscripcionMesaExamenDTO) {
        return itemInscripcionMesaExamenService.save(itemInscripcionMesaExamenDTO);
    }
    @PatchMapping("/{id}/estado")
    public ResponseEntity<ItemInscripcionMesaExamenDTO> actualizarEstado(@PathVariable Long id, @RequestParam String nuevoEstado) {
        ItemInscripcionMesaExamenDTO inscripcionActualizada = itemInscripcionMesaExamenService.actualizarEstado(id, nuevoEstado);
        return ResponseEntity.ok(inscripcionActualizada);
    }


    @PostMapping("/asignarNota")
    public ResponseEntity<Void> asignarNotas(@RequestBody List<ItemInscripcionMesaExamenNotasDTO> asignarNotasDTO) {
        try {
            for (ItemInscripcionMesaExamenNotasDTO item : asignarNotasDTO) {
                itemInscripcionMesaExamenService.asignarNota(item.getId(), item.getNota());
            }
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/notasMesasExamen/{dni}")
    public ResponseEntity<List<ItemInscripcionMesaExamenNotasGetDTO>> getItemInfoByDni(@PathVariable String dni) {
        List<ItemInscripcionMesaExamenNotasGetDTO> itemInfoList = itemInscripcionMesaExamenService.getItemInfoByDni(dni);
        if (itemInfoList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(itemInfoList);
    }


}

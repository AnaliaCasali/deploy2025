package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.TurnoDTO;
import com.backend.ISP63.model.Turno;
import com.backend.ISP63.repository.TurnoRepository;
import com.backend.ISP63.service.TurnoService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

@Service
public class TurnoServiceImpl implements TurnoService {

    @Autowired
    TurnoRepository turnoRepository;

    @Override
    public List<TurnoDTO> findAll() {
        List<Turno> turnos = turnoRepository.findAll();
        return turnos.stream()
                .map((e) -> new TurnoDTO(
                        e.getId(),
                        e.getTurno(),
                        e.getPeriodoInscripcionDesde(),
                        e.getPeriodoInscripcionHasta(),
                        e.getPeriodoExamenDesde(),
                        e.getPeriodoExamenHasta(),
                        e.getVigente()
                ))
                .collect(Collectors.toList());
    }

    /*@Override
    public List<Turno> findAllTurnosRecientes() {
        return turnoRepository.findAllByOrderByTurnoDesc();
    }*/

    @Override
    public TurnoDTO findById(Long id) throws Exception {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new Exception("Turno con ID " + id + " no encontrado"));

        TurnoDTO turnoDTO = new TurnoDTO(
                turno.getId(),
                turno.getTurno(),
                turno.getPeriodoInscripcionDesde(),
                turno.getPeriodoInscripcionHasta(),
                turno.getPeriodoExamenDesde(),
                turno.getPeriodoExamenHasta(),
                turno.getVigente()
        );
        return turnoDTO;
    }

    @Override
    public Turno findTurnoById(Long id) throws Exception {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new Exception("Turno con ID " + id + " no encontrado"));

        return turno;
    }

    @Override
    public TurnoDTO save(TurnoDTO turnoDTO) {
        Turno turno= new Turno(
                turnoDTO.getId(),
                turnoDTO.getTurno(),
                turnoDTO.getPeriodoInscripcionDesde(),
                turnoDTO.getPeriodoInscripcionHasta(),
                turnoDTO.getPeriodoExamenDesde(),
                turnoDTO.getPeriodoExamenHasta(),
                turnoDTO.getVigente()


        )    ;
        turno = turnoRepository.save(turno);
        turnoDTO.setId(turno.getId());
        return turnoDTO;

    }

    @Override
    public void delete(Long id) {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("no se encontro el id"));
        turnoRepository.delete(turno);
    }

    @Override
    public TurnoDTO editar(Long id, TurnoDTO turnoDTO) throws Exception {
        // Buscar el Turno existente por ID
        Optional<Turno> optionalTurno = turnoRepository.findById(id);
        if (!optionalTurno.isPresent()) {
            throw new EntityNotFoundException("No se encontró el turno con ID: " + id);
        }

        // Obtener el Turno existente y actualizar sus valores con los del TurnoDTO
        Turno turno = optionalTurno.get();
        turno.setTurno(turnoDTO.getTurno());
        turno.setPeriodoInscripcionDesde(turnoDTO.getPeriodoInscripcionDesde());
        turno.setPeriodoInscripcionHasta(turnoDTO.getPeriodoInscripcionHasta());
        turno.setPeriodoExamenDesde(turnoDTO.getPeriodoExamenDesde());
        turno.setPeriodoExamenHasta(turnoDTO.getPeriodoExamenHasta());
        turno.setVigente(turnoDTO.getVigente());

        // Guardar los cambios en la base de datos
        Turno turnoActualizado = turnoRepository.save(turno);

        // Convertir la entidad actualizada en DTO y retornarla
        return new TurnoDTO(
                turnoActualizado.getId(),
                turnoActualizado.getTurno(),
                turnoActualizado.getPeriodoInscripcionDesde(),
                turnoActualizado.getPeriodoInscripcionHasta(),
                turnoActualizado.getPeriodoExamenDesde(),
                turnoActualizado.getPeriodoExamenHasta(),
                turnoActualizado.getVigente()
        );
    }

}

package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.InscripcionMesaExamenDTO;
import com.backend.ISP63.dto.InscripcionMesaExamenGetDTO;
import com.backend.ISP63.dto.InscripcionMesaExamenSaveDTO;
import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.enums.Role;
import com.backend.ISP63.model.*;
import com.backend.ISP63.repository.InscripcionMesaExamenRepository;
import com.backend.ISP63.service.*;
import com.backend.ISP63.repository.ItemInscripcionMesaExamenRepository;
import com.backend.ISP63.service.InscripcionMesaExamenService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class InscripcionMesaExamenServiceImpl implements InscripcionMesaExamenService {

    @Autowired
    InscripcionMesaExamenRepository inscripcionMesaExamenRepository;

    @Autowired
    UserService userService;

    @Autowired
    MesaExamenService mesaExamenService;

    @Override
    public List<InscripcionMesaExamenDTO> findAll() {
        List<InscripcionMesaExamen> lista= inscripcionMesaExamenRepository.findAll();
        return lista.stream()
                .map( (e)-> new InscripcionMesaExamenDTO( e.getId(),e.getEstudiante(), e.getFechaHoraInscripcion(), e.getItems())
                ).collect(Collectors.toList()) ;

    }

    @Override
    public InscripcionMesaExamenDTO findById(Long id) throws Exception {
        InscripcionMesaExamen e = inscripcionMesaExamenRepository.findById(id)
                .orElseThrow(() -> new Exception("Inscripcion a Mesa de examen con id " + id + " no encontrada"));

        InscripcionMesaExamenDTO inscripcionMesaExamenDTO = new InscripcionMesaExamenDTO
                (e.getId(), e.getEstudiante(), e.getFechaHoraInscripcion(), e.getItems());
        return inscripcionMesaExamenDTO;
    }
    @Override
    @Transactional
    public InscripcionMesaExamen save(InscripcionMesaExamen inscripcion) {
        // Asegurarse de que los ítems tengan una referencia a la inscripción
        for (ItemInscripcionMesaExamen item : inscripcion.getItems()) {
            item.setInscripcion(inscripcion);
        }

        // Guardar la inscripción junto con los ítems
        return inscripcionMesaExamenRepository.save(inscripcion);
    }

// Inscripcion
    @Override
    @Transactional
    public InscripcionMesaExamenSaveDTO save(InscripcionMesaExamenSaveDTO inscripcionMesaExamenSaveDTO)  {

        try {

            User estudiante = userService.findUserById(inscripcionMesaExamenSaveDTO.getDniUsuario());


            List<MesaExamen> mesasExamen = mesaExamenService.findMesasByIds(inscripcionMesaExamenSaveDTO.getMesasExamenIds());

        // Verificar si ya existe una inscripción para este estudiante y turno
        Optional<InscripcionMesaExamen> inscripcionExistente = inscripcionMesaExamenRepository
                .findByEstudianteDniAndTurno(estudiante.getDni(), mesasExamen.get(0).getTurno().getId());

        if (inscripcionExistente.isPresent()) {
            // Si existe, eliminamos la inscripción anterior
            inscripcionMesaExamenRepository.delete(inscripcionExistente.get());
        }

        // Crear una nueva inscripción
        InscripcionMesaExamen inscripcion = new InscripcionMesaExamen();
        inscripcion.setEstudiante(estudiante);
        inscripcion.setFechaHoraInscripcion(LocalDateTime.now());

            InscripcionMesaExamen finalInscripcion = inscripcion;
            Set<ItemInscripcionMesaExamen> items = mesasExamen
                    .stream()
                    .map(mesa -> {
                            ItemInscripcionMesaExamen item = new ItemInscripcionMesaExamen();
                            item.setMesaExamen(mesa);
                            item.setEstado(EstadoInscripcion.valueOf(inscripcionMesaExamenSaveDTO.getEstado()));
                            item.setInscripcion(finalInscripcion);
                            return item;
            }).collect(Collectors.toSet());

            inscripcion.setItems(items);

            // guardar la inscripcion
            inscripcion = inscripcionMesaExamenRepository.save(inscripcion);

            inscripcionMesaExamenSaveDTO.setMesasExamenIds(
                    inscripcion.getItems().stream().map(item -> item.getMesaExamen().getId()).collect(Collectors.toList())
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return inscripcionMesaExamenSaveDTO;
    }

    // lista de todos los inscriptos
    @Override
    public List<InscripcionMesaExamenGetDTO> obtenerInscriptos() throws Exception {


        return inscripcionMesaExamenRepository.findAll().stream()
                .flatMap(inscripcion -> inscripcion.getItems().stream())
                .map(item -> {
                    User estudiante = item.getInscripcion().getEstudiante();
                    Asignatura asignatura = item.getMesaExamen().getAsignatura();
                    Carrera carrera = asignatura.getCarrera();

                    return new InscripcionMesaExamenGetDTO(
                            item.getId(),
                            item.getMesaExamen().getId(),
                            estudiante.getNombre() + " " + estudiante.getApellido(),
                            estudiante.getDni(),
                            carrera.getCarrera(),
                            carrera.getId(),
                            String.valueOf(asignatura.getAnio()),
                            asignatura.getNombre(),
                            item.getEstado().toString(),
                            item.getMesaExamen().getLlamado().toString()
                    );
                })
                .collect(Collectors.toList());
    }



    //lista inscriptos APROBADOS
@Override
public List<InscripcionMesaExamenGetDTO> obtenerInscriptosAceptados() throws Exception {



    return inscripcionMesaExamenRepository.findAll().stream()
            .flatMap(inscripcion -> inscripcion.getItems().stream())
            .filter(item -> item.getEstado().equals(EstadoInscripcion.APROBADO))
                .map(item -> {
                    User estudiante = item.getInscripcion().getEstudiante();
                    Asignatura asignatura = item.getMesaExamen().getAsignatura();
                    Carrera carrera = asignatura.getCarrera();

                    return new InscripcionMesaExamenGetDTO(
                            item.getId(),
                            item.getMesaExamen().getId(),
                            estudiante.getNombre() + " " + estudiante.getApellido(),
                            estudiante.getDni(),
                            carrera.getCarrera(),
                            carrera.getId(),
                            String.valueOf(asignatura.getAnio()),
                            asignatura.getNombre(),
                            item.getEstado().toString(),
                            item.getMesaExamen().getLlamado().toString()
                    );
                })
                .collect(Collectors.toList());
    }



}



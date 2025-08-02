package com.backend.ISP63.service.impl;


import com.backend.ISP63.dto.MesaExamenDTO;
import com.backend.ISP63.dto.MesaExamenGetDTO;
import com.backend.ISP63.dto.MesaExamenListGetDTO;
import com.backend.ISP63.dto.MesaExamenPostDTO;
import com.backend.ISP63.enums.LlamadoTurno;
import com.backend.ISP63.enums.Role;
import com.backend.ISP63.exceptions.ResourceNotFoundException;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.Carrera;
import com.backend.ISP63.model.MesaExamen;
import com.backend.ISP63.model.User;
import com.backend.ISP63.repository.AsignaturaRepository;
import com.backend.ISP63.repository.MesaExamenRepository;
import com.backend.ISP63.service.*;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.data.jpa.domain.AbstractPersistable_.id;

@Service
public class MesaExamenServiceImpl implements MesaExamenService {

    @Autowired
    MesaExamenRepository mesaExamenRepository;

    @Autowired
    UserService userService;
    @Autowired
    TurnoService turnoService;
    @Autowired
    AsignaturaService asignaturaService;
    @Autowired
    CarreraService carreraService;
    @Override
    public MesaExamenPostDTO save(MesaExamenPostDTO mesaExamenPostDTO) {
        MesaExamen mesaExamen = null;
        try {
            mesaExamen = new MesaExamen(mesaExamenPostDTO.getId(),
                   mesaExamenPostDTO.getFechaHora(),
                    mesaExamenPostDTO.getLlamado(),
                    userService.findUserById(mesaExamenPostDTO.getPresidente()),
                    userService.findUserById(mesaExamenPostDTO.getVocal1()),
                    userService.findUserById(mesaExamenPostDTO.getVocal2()),
                    turnoService.findTurnoById(mesaExamenPostDTO.getTurno()),
                    asignaturaService.findAsignaturaById(mesaExamenPostDTO.getAsignatura()));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        mesaExamen = mesaExamenRepository.save(mesaExamen);
        mesaExamenPostDTO.setId(mesaExamen.getId());
        return mesaExamenPostDTO;
    }

    @Override
    public MesaExamenPostDTO put(Long id, MesaExamenPostDTO mesaExamenPostDTO) throws Exception{
        // Buscar la MesaExamen existente por ID
        MesaExamen mesaExamen = mesaExamenRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No se encontró la mesa de examen con ID: " + id));

        try {
            // Actualizar los valores de MesaExamen utilizando mesaExamenPostDTO
            mesaExamen.setFechaHora(mesaExamenPostDTO.getFechaHora());
            mesaExamen.setLlamado(mesaExamenPostDTO.getLlamado());
            mesaExamen.setPresidente(userService.findUserById(mesaExamenPostDTO.getPresidente()));
            mesaExamen.setVocal1(userService.findUserById(mesaExamenPostDTO.getVocal1()));
            mesaExamen.setVocal2(userService.findUserById(mesaExamenPostDTO.getVocal2()));
            mesaExamen.setTurno(turnoService.findTurnoById(mesaExamenPostDTO.getTurno()));
            mesaExamen.setAsignatura(asignaturaService.findAsignaturaById(mesaExamenPostDTO.getAsignatura()));

        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar la mesa de examen", e);
        }

        // Guardar los cambios en la base de datos
        mesaExamen = mesaExamenRepository.save(mesaExamen);

        // Convertir la entidad actualizada en DTO para retornarla
        return new MesaExamenPostDTO(
                mesaExamen.getId(),
                mesaExamen.getFechaHora(),
                mesaExamen.getLlamado(),
                mesaExamen.getPresidente().getDni(),
                mesaExamen.getVocal1().getDni(),
                mesaExamen.getVocal2().getDni(),
                mesaExamen.getTurno().getId(),
                mesaExamen.getAsignatura().getId()
        );
    }

    @Override
    public List<MesaExamenDTO> getAll() {
        return mesaExamenRepository.findAll()
                .stream()
                .map(e -> new MesaExamenDTO(e.getId(),
                        e.getFechaHora(),
                        e.getLlamado(),
                        e.getPresidente(),
                        e.getVocal1(),
                        e.getVocal2(),
                        e.getTurno(),
                        e.getAsignatura()))
                .collect(Collectors.toList());
    }

    @Override
    public MesaExamenPostDTO findByTurno(Long id) {
        MesaExamen mesaExamen = mesaExamenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa de Examen no encontrada con el id: " + id));

        MesaExamenPostDTO dto = new MesaExamenPostDTO();
        dto.setId(mesaExamen.getId());
        dto.setFechaHora(mesaExamen.getFechaHora());
        dto.setLlamado(mesaExamen.getLlamado());
        dto.setPresidente(mesaExamen.getPresidente().getDni());
        dto.setVocal1(mesaExamen.getVocal1().getDni());
        dto.setVocal2(mesaExamen.getVocal2().getDni());
        dto.setTurno(mesaExamen.getTurno().getId());
        dto.setAsignatura(mesaExamen.getAsignatura().getId());

        return dto;
    }

    @Override
    public MesaExamenDTO findById(Long id) {
        MesaExamen e = mesaExamenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mesa de examen con id " + id + " no encontrada"));

        return new MesaExamenDTO(
                e.getId(),
                e.getFechaHora(),
                e.getLlamado(),
                e.getPresidente(),
                e.getVocal1(),
                e.getVocal2(),
                e.getTurno(),
                e.getAsignatura()
        );
    }

/*    @Override
    public MesaExamenDTO patch(Long id, MesaExamenDTO mesaExamenDTO) {
        try {
            MesaExamenDTO m = this.findById(id);
            m.setFechaHora(mesaExamenDTO.getFechaHora());
            m.setLlamado(mesaExamenDTO.getLlamado());
            m.setPresidente(mesaExamenDTO.getPresidente());
            m.setVocal1(mesaExamenDTO.getVocal1());
            m.setVocal2(mesaExamenDTO.getVocal2());
            m.setTurno(mesaExamenDTO.getTurno());
            m.setAsignatura(mesaExamenDTO.getAsignatura());

            MesaExamen mesaExamen = new MesaExamen(id,
                    m.getFechaHora(),
                    m.getLlamado(),
                    m.getPresidente(),
                    m.getVocal1(),
                    m.getVocal2(),
                    m.getTurno(),
                    m.getAsignatura());
            mesaExamenRepository.save(mesaExamen);
            return m;
        } catch (Exception e) {
            return null;
        }
    }*/

    @Override
    public void delete(Long id) {
        MesaExamen mesaExamen = mesaExamenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("no se encontro el id"));
        mesaExamenRepository.delete(mesaExamen);
    }

    @Override
    public MesaExamen findMesaExamnById(Long id) throws Exception {
        MesaExamen e = mesaExamenRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignatura con id "
                        + id + " no se encontro"));
        return e;
    }


    //toda la lista de mesas de exmen
    @Override
    public List<MesaExamenListGetDTO> findAllMesas() throws Exception{

        return mesaExamenRepository.findAll()
                .stream()
                .map(mesa -> {


                    Asignatura asignatura = mesa.getAsignatura();

                    String presidenteNombre = mesa.getPresidente() != null ? mesa.getPresidente().getNombre() : "N/A";
                    String presidenteApellido = mesa.getPresidente() != null ? mesa.getPresidente().getApellido() : "";

                    String vocal1Nombre = mesa.getVocal1() != null ? mesa.getVocal1().getNombre() : "N/A";
                    String vocal1Apellido = mesa.getVocal1() != null ? mesa.getVocal1().getApellido() : "";

                    String vocal2Nombre = mesa.getVocal2() != null ? mesa.getVocal2().getNombre() : "N/A";
                    String vocal2Apellido = mesa.getVocal2() != null ? mesa.getVocal2().getApellido() : "";

                    String tribunal = String.format("%s %s, %s %s, %s %s",
                            presidenteNombre, presidenteApellido,
                            vocal1Nombre, vocal1Apellido,
                            vocal2Nombre, vocal2Apellido);

                    String[] fechaHora = mesa.getFechaHora().toString().split("T");
                    String fecha = fechaHora[0];
                    String hora = fechaHora.length > 1 ? fechaHora[1] : "00:00";


                    return new MesaExamenListGetDTO(
                            mesa.getId(),
                            mesa.getLlamado().toString(),
                            fecha + " " + hora,
                            asignatura.getAnio(),
                            asignatura.getNombre(),
                            asignatura.getCarrera().getId(),
                            asignatura.getCarrera().getCarrera(),

                            tribunal
                    );
                })
                .collect(Collectors.toList());
    }
    @Override
    public List<MesaExamen> findMesasByIds(List<Long> ids) {
        return mesaExamenRepository.findAllById(ids);
    }


    // mesas disponisbles por alumno
    @Override
    public List<MesaExamenListGetDTO> findMesasExamenDisponibles(String dniEstudiante) throws Exception {
        User estudiante = userService.findUserById(dniEstudiante);

        if (estudiante.getRol().equals(Role.ADMIN)) {
           return findAllMesas();
        }

        Carrera carrera = estudiante.getCarrera();
        List<Long> mesaIdsDisponibles = mesaExamenRepository.findMesasExamenDisponibles(carrera.getId());
        return mesaExamenRepository.findAllById(mesaIdsDisponibles)
                .stream()
                .map(mesa -> {
                    Asignatura asignatura = mesa.getAsignatura();

                    String presidenteNombre = mesa.getPresidente() != null ? mesa.getPresidente().getNombre() : "N/A";
                    String presidenteApellido = mesa.getPresidente() != null ? mesa.getPresidente().getApellido() : "";
                    String vocal1Nombre = mesa.getVocal1() != null ? mesa.getVocal1().getNombre() : "N/A";
                    String vocal1Apellido = mesa.getVocal1() != null ? mesa.getVocal1().getApellido() : "";
                    String vocal2Nombre = mesa.getVocal2() != null ? mesa.getVocal2().getNombre() : "N/A";
                    String vocal2Apellido = mesa.getVocal2() != null ? mesa.getVocal2().getApellido() : "";

                    String tribunal = String.format("%s %s, %s %s, %s %s",
                            presidenteNombre, presidenteApellido,
                            vocal1Nombre, vocal1Apellido,
                            vocal2Nombre, vocal2Apellido);

                    String[] fechaHora = mesa.getFechaHora().toString().split("T");
                    String fecha = fechaHora[0];
                    String hora = fechaHora.length > 1 ? fechaHora[1] : "00:00";

                    return new MesaExamenListGetDTO(
                            mesa.getId(),
                            mesa.getLlamado().toString(),
                            fecha + " " + hora,
                            asignatura.getAnio(),
                            asignatura.getNombre(),
                            asignatura.getCarrera().getId(),
                            asignatura.getCarrera().getCarrera(),
                            tribunal
                    );
                })
                .collect(Collectors.toList());
    }




}

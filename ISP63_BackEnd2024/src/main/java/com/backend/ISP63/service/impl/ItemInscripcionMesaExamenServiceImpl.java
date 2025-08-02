package com.backend.ISP63.service.impl;



import com.backend.ISP63.dto.ItemInscripcionMesaExamenDTO;

import com.backend.ISP63.dto.ItemInscripcionMesaExamenNotasDTO;
import com.backend.ISP63.dto.ItemInscripcionMesaExamenNotasGetDTO;
import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.model.*;
import com.backend.ISP63.repository.ItemInscripcionMesaExamenRepository;
import com.backend.ISP63.service.ItemInscripcionMesaExamenService;
import com.backend.ISP63.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemInscripcionMesaExamenServiceImpl implements ItemInscripcionMesaExamenService {

    @Autowired
    ItemInscripcionMesaExamenRepository itemInscripcionMesaExamenRepository;

    @Autowired
    UserService userService;

    @Override
    public List<ItemInscripcionMesaExamenDTO> findAll() {
        List<ItemInscripcionMesaExamen> lista = itemInscripcionMesaExamenRepository.findAll();
        return lista
                .stream()
                .map((e) -> new ItemInscripcionMesaExamenDTO(
                        e.getId(),
                        e.getInscripcion(),
                        e.getMesaExamen(),
                        e.getEstado(),
                        e.getNota(),
                        e.getAusente()
                ))
                .collect(Collectors.toList());
    }


    @Override
    public ItemInscripcionMesaExamenDTO findById(Long id) throws Exception {
        ItemInscripcionMesaExamen e = itemInscripcionMesaExamenRepository.findById(id)
                .orElseThrow(() -> new Exception("Inscripcion a Mesa de examen con id " + id + " no encontrada"));

        ItemInscripcionMesaExamenDTO itemInscripcionMesaExamenDTO = new ItemInscripcionMesaExamenDTO

                (e.getId(), e.getInscripcion(), e.getMesaExamen(), e.getEstado(),e.getNota(),e.getAusente());
        return itemInscripcionMesaExamenDTO;    }

    @Override
    @Transactional
    public ItemInscripcionMesaExamen updateEstado(Long itemId, EstadoInscripcion nuevoEstado) {
        Optional<ItemInscripcionMesaExamen> itemOpt = itemInscripcionMesaExamenRepository.findById(itemId);
        if (itemOpt.isPresent()) {
            ItemInscripcionMesaExamen item = itemOpt.get();
            item.setEstado(nuevoEstado);
            return itemInscripcionMesaExamenRepository.save(item);
        } else {
            throw new EntityNotFoundException("Item no encontrado");
        }
    }

    // Filtrar ítems de inscripción por asignatura y turno
    @Override
    public List<ItemInscripcionMesaExamen> findByAsignaturaAndTurno(Long idAsignatura, Long idTurno) {
        return itemInscripcionMesaExamenRepository.findByMesaExamenAsignaturaIdAndMesaExamenTurnoId(idAsignatura, idTurno);
    }

    // Filtrar ítems de inscripción por ID de estudiante y ID de turno
    @Override
    public List<ItemInscripcionMesaExamen> findByEstudianteAndTurno(String dniEstudiante, Long idTurno) {
        return itemInscripcionMesaExamenRepository.findByInscripcionEstudianteDniAndMesaExamenTurnoId(dniEstudiante, idTurno);
    }

    //save para inscripcion
    @Override
    public ItemInscripcionMesaExamenDTO save(ItemInscripcionMesaExamenDTO itemInscripcionMesaExamenDTO) {
        ItemInscripcionMesaExamen itemInscripcionMesaExamen = null;
        try {
            itemInscripcionMesaExamen = new ItemInscripcionMesaExamen(itemInscripcionMesaExamenDTO.getId(),
                    itemInscripcionMesaExamenDTO.getInscripcion(),
                    itemInscripcionMesaExamenDTO.getMesaExamen(),
                    itemInscripcionMesaExamenDTO.getEstado(),
                    itemInscripcionMesaExamenDTO.getNota(),
                    itemInscripcionMesaExamenDTO.getAusente()
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        itemInscripcionMesaExamen = itemInscripcionMesaExamenRepository.save(itemInscripcionMesaExamen);
        itemInscripcionMesaExamenDTO.setId(itemInscripcionMesaExamen.getId());
        return itemInscripcionMesaExamenDTO;
    }

    //actualizar el estado de la inscripcion
    @Override
    public ItemInscripcionMesaExamenDTO actualizarEstado(Long id, String nuevoEstado) {
            // Buscar la inscripción por su ID
            Optional<ItemInscripcionMesaExamen> inscripcionOptional = itemInscripcionMesaExamenRepository.findById(id);

            if (!inscripcionOptional.isPresent()) {
                throw new RuntimeException("Inscripción no encontrada con id: " + id);
            }

            // Obtener la inscripción
            ItemInscripcionMesaExamen itemInscripcionMesaExamen = inscripcionOptional.get();

            // Actualizar el estado
            itemInscripcionMesaExamen.setEstado(EstadoInscripcion.valueOf(nuevoEstado));

            // Guardar los cambios
            ItemInscripcionMesaExamen inscripcionActualizada = itemInscripcionMesaExamenRepository.save(itemInscripcionMesaExamen);

            // Convertir a DTO para devolver
            return convertirAInscripcionDTO(inscripcionActualizada);
        }

        // Método auxiliar para convertir entidad a DTO
        private ItemInscripcionMesaExamenDTO convertirAInscripcionDTO(ItemInscripcionMesaExamen itemInscripcionMesaExamen) {
            ItemInscripcionMesaExamenDTO dto = new ItemInscripcionMesaExamenDTO();
            dto.setId(itemInscripcionMesaExamen.getId());
            dto.setEstado(itemInscripcionMesaExamen.getEstado());
            // Mapear otros campos si es necesario
            return dto;
        }
    @Override
    public ItemInscripcionMesaExamen asignarNota(Long id, int nota) throws Exception {

        if (nota < 1 || nota > 10) {
            throw new IllegalArgumentException("Calificación no válida");
        }

        ItemInscripcionMesaExamen item = itemInscripcionMesaExamenRepository
                .findById(id)
                .orElseThrow(() -> new Exception("El ítem no existe"));

        item.setNota(nota);
        item.setAusente(false);
        return itemInscripcionMesaExamenRepository.save(item);
    }


    // muestra nota, llamado y asignatura por cada dni
    @Override
    public List<ItemInscripcionMesaExamenNotasGetDTO> getItemInfoByDni(String dni) {
        List<ItemInscripcionMesaExamen> items = itemInscripcionMesaExamenRepository.findByInscripcion_Estudiante_Dni(dni);
        return items.stream()
                .map(item -> new ItemInscripcionMesaExamenNotasGetDTO(
                        item.getNota(),
                        item.getMesaExamen().getAsignatura().getNombre(),
                        item.getMesaExamen().getLlamado()
                ))
                .collect(Collectors.toList());
    }


}


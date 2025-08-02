package com.backend.ISP63.service;


import com.backend.ISP63.dto.ItemInscripcionMesaExamenDTO;
import com.backend.ISP63.dto.ItemInscripcionMesaExamenNotasDTO;
import com.backend.ISP63.dto.ItemInscripcionMesaExamenNotasGetDTO;
import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.model.ItemInscripcionMesaExamen;


import java.util.List;

public interface ItemInscripcionMesaExamenService {

    public List<ItemInscripcionMesaExamenDTO> findAll();

    public ItemInscripcionMesaExamenDTO findById(Long id) throws Exception;
    public ItemInscripcionMesaExamen updateEstado(Long itemId, EstadoInscripcion nuevoEstado);
    public List<ItemInscripcionMesaExamen> findByAsignaturaAndTurno(Long idAsignatura, Long idTurno);
    public List<ItemInscripcionMesaExamen> findByEstudianteAndTurno(String dniEstudiante, Long idTurno);
    public ItemInscripcionMesaExamenDTO save (ItemInscripcionMesaExamenDTO itemInscripcionMesaExamenDTO);

    public ItemInscripcionMesaExamenDTO actualizarEstado(Long id, String nuevoEstado);
    public ItemInscripcionMesaExamen asignarNota(Long itemId, int nota) throws Exception;

    public List<ItemInscripcionMesaExamenNotasGetDTO> getItemInfoByDni(String dni);

}

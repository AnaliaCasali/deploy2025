package com.backend.ISP63.service;


import com.backend.ISP63.dto.*;
import com.backend.ISP63.exceptions.ResourceNotFoundException;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.MesaExamen;

import java.util.List;

public interface MesaExamenService {
    public MesaExamenPostDTO save (MesaExamenPostDTO mesaExamenPostDTO);
    public MesaExamenPostDTO put(Long id, MesaExamenPostDTO mesaExamenPostDTO) throws Exception;
    List<MesaExamenDTO> getAll();
    MesaExamenDTO findById(Long id);
    //public MesaExamenDTO patch(Long id,MesaExamenDTO mesaExamenDTO);
    public void  delete (Long id);
    //base de datos isp63
    //getAll getById

    public MesaExamenPostDTO findByTurno(Long id);

    MesaExamen findMesaExamnById(Long id) throws Exception;

    public List<MesaExamenListGetDTO> findAllMesas() throws Exception;

    List<MesaExamen> findMesasByIds(List<Long> ids);


    public List<MesaExamenListGetDTO> findMesasExamenDisponibles(String dniEstudiante) throws Exception;
}

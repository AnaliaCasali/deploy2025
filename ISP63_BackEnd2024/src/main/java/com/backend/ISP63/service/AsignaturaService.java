package com.backend.ISP63.service;

import com.backend.ISP63.dto.AsignaturaDTO;
import com.backend.ISP63.dto.AsignaturaFiltroGetDTO;
import com.backend.ISP63.dto.AsignaturaGetDTO;
import com.backend.ISP63.exceptions.ResourceNotFoundException;
import com.backend.ISP63.model.Asignatura;

import java.util.List;

public interface AsignaturaService {

     AsignaturaDTO post (AsignaturaDTO asignaturaDTO) throws ResourceNotFoundException;
     AsignaturaDTO put (Integer id, AsignaturaDTO asignatura) throws ResourceNotFoundException;
     void delete (Integer id) throws ResourceNotFoundException;
     AsignaturaGetDTO findById(Integer id);
     Asignatura findAsignaturaById(Integer id) throws Exception;
     List<AsignaturaGetDTO> findAll();
     AsignaturaDTO getById(Integer id);

     List<AsignaturaGetDTO> findAllMin() throws Exception;

    List<AsignaturaGetDTO> findByCarreraId(Integer id);

    public List<AsignaturaFiltroGetDTO> findAsignaturasByCarreraAndAnio(int carreraId, int anio);
}

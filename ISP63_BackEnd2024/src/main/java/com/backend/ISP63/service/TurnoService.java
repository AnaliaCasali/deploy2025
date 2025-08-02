package com.backend.ISP63.service;

import com.backend.ISP63.dto.TurnoDTO;
import com.backend.ISP63.dto.UserDTO;
import com.backend.ISP63.model.Turno;

import java.util.List;

public interface TurnoService {

    public List<TurnoDTO> findAll();

    //public List<Turno> findAllTurnosRecientes();
    TurnoDTO findById(Long id) throws Exception;
    Turno findTurnoById(Long id) throws Exception;
    public TurnoDTO save(TurnoDTO turnoDTO);
    public void delete(Long id);

    TurnoDTO editar(Long id, TurnoDTO turnoDTO) throws Exception;

}

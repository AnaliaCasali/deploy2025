package com.backend.ISP63.service;

import com.backend.ISP63.dto.InscripcionMesaExamenDTO;

import com.backend.ISP63.dto.InscripcionMesaExamenGetDTO;
import com.backend.ISP63.dto.InscripcionMesaExamenSaveDTO;
import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.model.ItemInscripcionMesaExamen;
import org.springframework.stereotype.Service;

import java.util.List;


public interface InscripcionMesaExamenService {
    public List<InscripcionMesaExamenDTO> findAll();
    InscripcionMesaExamenDTO findById(Long id) throws Exception;

    public InscripcionMesaExamen save(InscripcionMesaExamen inscripcion);

    //guarda la inscripcion
    public InscripcionMesaExamenSaveDTO save(InscripcionMesaExamenSaveDTO inscripcionMesaExamenSaveDTO) throws Exception;

    //lista inscriptos

    public List<InscripcionMesaExamenGetDTO> obtenerInscriptos() throws Exception;

    public List<InscripcionMesaExamenGetDTO> obtenerInscriptosAceptados() throws Exception;
    }

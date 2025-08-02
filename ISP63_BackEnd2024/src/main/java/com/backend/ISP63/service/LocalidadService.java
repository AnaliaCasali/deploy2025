package com.backend.ISP63.service;

import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.model.Localidad;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface LocalidadService {
    public List<LocalidadDTO> findAll();
    public Optional<Localidad> findById(Integer id);
}

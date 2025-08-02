package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.model.Localidad;
import com.backend.ISP63.repository.LocalidadRepository;
import com.backend.ISP63.service.LocalidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LocalidadServiceImpl implements LocalidadService {

    @Autowired
    LocalidadRepository localidadRepository;

    @Override
    public Optional<Localidad> findById(Integer id) {
        Localidad loc = localidadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("El id "
                        + id + " no se encontro"));

        // Creamos el DTO, usando null para el logo si no existe
/*        LocalidadDTO localidadDTO = new LocalidadDTO(
                loc.getId(),
                loc.getLocalidad(),
                loc.getCP(),
                loc.getProvincia()
                loc.getProvincia().getPais());
  */      return Optional.of(loc);
    }

    @Override
    public List<LocalidadDTO> findAll() {
        return localidadRepository
                .findAll()
                .stream()
                .map(e -> new LocalidadDTO(
                                e.getId(),
                                e.getLocalidad(),
                                e.getCP(),
                                e.getProvincia() != null
                                        ? e.getProvincia().getNombre() : "",
                                e.getProvincia() != null
                                        ? e.getProvincia().getPais().toString() : ""
                        )
                ).collect(Collectors.toList());

    }

}

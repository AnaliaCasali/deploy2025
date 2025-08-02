package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.AsignaturaDTO;
import com.backend.ISP63.dto.AsignaturaFiltroGetDTO;
import com.backend.ISP63.dto.AsignaturaGetDTO;
import com.backend.ISP63.exceptions.ResourceNotFoundException;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.repository.AsignaturaRepository;
import com.backend.ISP63.service.AsignaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AsignaturaServiceImpl implements AsignaturaService {

    @Autowired
    AsignaturaRepository asignaturaRepository;

    @Override
    public AsignaturaDTO post(AsignaturaDTO asignaturaDTO) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public AsignaturaDTO put(Integer id, AsignaturaDTO asignatura) throws ResourceNotFoundException {
        return null;
    }

    @Override
    public void delete(Integer id) throws ResourceNotFoundException {
        //asignaturaRepository.deleteById(id);
        Asignatura asignatura = asignaturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("no se encontro el id"));
        asignaturaRepository.deleteById(id);
    }


    @Override
    public List<AsignaturaGetDTO> findAll() {
        return asignaturaRepository
                .findAll()
                .stream()
                .map(e -> new AsignaturaGetDTO(
                        e.getAnio(),
                        e.getHoras(),
                        e.getPeriodo().toString(),
                        e.getCarrera().getId(),
                        e.getId(),
                        e.getNombre(),
                        e.getCorrelativasCursar() != null
                                ? e.getCorrelativasCursar().stream()
                                .map(Asignatura::getNombre)
                                .collect(Collectors.joining(", "))
                                : "No hay correlativas para cursas",
                        e.getCorrelativasrendir() != null
                                ? e.getCorrelativasrendir().stream()
                                .map(Asignatura::getNombre)
                                .collect(Collectors.joining(", "))
                                : "No hay correlativas parta rendir",
                        "")
                ).collect(Collectors.toList());

    }

    @Override
    public AsignaturaDTO getById(Integer id) {
        Asignatura e = asignaturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("no se encontro el id"));

        return new AsignaturaDTO(
                e.getId(),
                e.getNombre(),
                e.getDetalle(),
                e.getAnio(),
                e.getHoras(),
                e.getOrientacion(),
                e.isElectiva(),
                e.getPeriodo(),
                e.getCarrera(),
                e.getCorrelativasCursar(),
                e.getCorrelativasrendir());
    }

    @Override
    public List<AsignaturaGetDTO> findAllMin() {
        return asignaturaRepository
                .findAll()
                .stream()
                .map(e -> new AsignaturaGetDTO(
                        e.getAnio(),
                        e.getHoras(),
                        e.getPeriodo().toString(),
                        e.getCarrera().getId(),
                        e.getId(),
                        e.getNombre(),
                        e.getCorrelativasCursar() != null
                                ? e.getCorrelativasCursar().stream()
                                .map(Asignatura::getNombre)
                                .collect(Collectors.joining(", "))
                                : "No hay correlativas para cursas",
                        e.getCorrelativasrendir() != null
                                ? e.getCorrelativasrendir().stream()
                                .map(Asignatura::getNombre)
                                .collect(Collectors.joining(", "))
                                : "No hay correlativas parta rendir",
                        ""
                        )
               ).collect(Collectors.toList());

    }

    @Override
    public AsignaturaGetDTO findById(Integer id) {
        Asignatura e = asignaturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignatura con id "
                        + id + " no se encontro"));

        AsignaturaGetDTO asignaturaGetDTO = new AsignaturaGetDTO(
                e.getAnio(),
                e.getHoras(),
                e.getPeriodo().toString(),
                e.getCarrera().getId(),
                e.getId(),
                e.getNombre(),
                e.getCorrelativasCursar() != null
                        ? e.getCorrelativasCursar().stream()
                        .map(Asignatura::getNombre)
                        .collect(Collectors.joining(", "))
                        : "No hay correlativas para cursas",
                e.getCorrelativasrendir() != null
                        ? e.getCorrelativasrendir().stream()
                        .map(Asignatura::getNombre)
                        .collect(Collectors.joining(", "))
                        : "No hay correlativas parta rendir",
                "");
        return asignaturaGetDTO;


    }

    @Override
    public Asignatura findAsignaturaById(Integer id) throws Exception {
        Asignatura e = asignaturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Asignatura con id "
                        + id + " no se encontro"));
        return e;
    }
    /* para correlativas
    public void establecerCorrelativas(Asignatura asignatura, List<Asignatura> correlativas) {
        asignatura.setCorrelativas(correlativas);
        asignaturaRepository.save(asignatura);
    }*/


    @Override
    public List<AsignaturaGetDTO> findByCarreraId(Integer carreraId) {
        // Lógica para convertir Asignatura a AsignaturaDTO si es necesario
        return asignaturaRepository
                .findByCarreraId(carreraId)
                .stream()
                .map(e -> new AsignaturaGetDTO(
                        e.getAnio(),
                        e.getHoras(),
                        e.getPeriodo().toString(),
                        e.getCarrera().getId(),
                        e.getId(),
                        e.getNombre(),
                        e.getCorrelativasCursar() != null
                                ? e.getCorrelativasCursar().stream()
                                .map(Asignatura::getNombre)
                                .collect(Collectors.joining(", "))
                                : "No hay correlativas para cursas",
                        e.getCorrelativasrendir() != null
                                ? e.getCorrelativasrendir().stream()
                                .map(Asignatura::getNombre)
                                .collect(Collectors.joining(", "))
                                : "No hay correlativas parta rendir",
                        ""
                        )
                ).collect(Collectors.toList());

    }

// filtra las asignaturas por carrera y año
    @Override
    public List<AsignaturaFiltroGetDTO> findAsignaturasByCarreraAndAnio(int carreraId, int anio) {
        List<Asignatura> asignaturas = asignaturaRepository.findByCarreraIdAndAnio(carreraId, anio);
        return asignaturas.stream()
                .map(asignatura -> new AsignaturaFiltroGetDTO(
                        asignatura.getId(),
                        asignatura.getNombre()))
                .collect(Collectors.toList());
    }

}



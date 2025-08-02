package com.backend.ISP63.service;

import com.backend.ISP63.dto.EventoDTO;

import java.util.List;

public interface EventoService {

    EventoDTO save(EventoDTO eventoDTO);

    List<EventoDTO > findAll();

    EventoDTO findById(Long id);

    EventoDTO patchEvento(Long id, EventoDTO eventoDTO);

    void delete(Long id);
}


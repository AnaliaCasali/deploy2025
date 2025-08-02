package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.CarreraDTO;
import com.backend.ISP63.dto.EventoDTO;
import com.backend.ISP63.dto.ImagenDTO;
import com.backend.ISP63.model.Evento;
import com.backend.ISP63.repository.EventoRepository;
import com.backend.ISP63.service.EventoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventoServiceImpl implements EventoService {

    @Autowired
    private EventoRepository eventoRepository;

    @Override
    public EventoDTO save( EventoDTO eventoDTO) {
        Evento evento = new Evento();
        evento.setFecha(eventoDTO.getFecha());
        evento.setTitulo(eventoDTO.getTitulo());
        evento.setSubtitulo(eventoDTO.getSubtitulo());
        evento.setDescripcion(eventoDTO.getDescripcion());
        evento = eventoRepository.save(evento);
        return new EventoDTO(evento.getId(), evento.getFecha(), evento.getTitulo(),
                evento.getSubtitulo(), evento.getDescripcion(), null);
    }

    @Override
    public List<EventoDTO> findAll() {
        List<Evento> eventos = eventoRepository.findAll();
        return eventos.stream()
                .map(evento -> new EventoDTO(evento.getId(), evento.getFecha(), evento.getTitulo(),
                        evento.getSubtitulo(), evento.getDescripcion(),
                        evento.getImagen() != null
                                ? new ImagenDTO(evento.getImagen().getId(), evento.getImagen().getUrl(), evento.getImagen().getAlt(), evento.getImagen().getNombre())
                                : null // Si el logo es null, asigna null al logo en el DTO


        ))
                .collect(Collectors.toList());
    }


    @Override
    public EventoDTO findById(Long id) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isEmpty()) {
            return null; // Podrías lanzar una excepción aquí si prefieres
        }
        Evento evento = optionalEvento.get();
        return new EventoDTO(evento.getId(), evento.getFecha(), evento.getTitulo(),
                evento.getSubtitulo(), evento.getDescripcion(), null);
    }

    @Override
    public EventoDTO patchEvento(Long id, EventoDTO eventoDTO) {
        Optional<Evento> optionalEvento = eventoRepository.findById(id);
        if (optionalEvento.isEmpty()) {
            return null; // También aquí podrías manejar la excepción
        }
        Evento evento = optionalEvento.get();
        if (eventoDTO.getFecha() != null) evento.setFecha(eventoDTO.getFecha());
        if (eventoDTO.getTitulo() != null) evento.setTitulo(eventoDTO.getTitulo());
        if (eventoDTO.getSubtitulo() != null) evento.setSubtitulo(eventoDTO.getSubtitulo());
        if (eventoDTO.getDescripcion() != null) evento.setDescripcion(eventoDTO.getDescripcion());
        evento = eventoRepository.save(evento);
        return new EventoDTO(evento.getId(), evento.getFecha(), evento.getTitulo(),
                evento.getSubtitulo(), evento.getDescripcion(), null);
    }

    @Override
    public void delete(Long id) {
        eventoRepository.deleteById(id);
    }
}

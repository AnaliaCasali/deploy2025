package com.backend.ISP63.service.impl;
import com.backend.ISP63.dto.ImagenDTO;
import com.backend.ISP63.dto.NoticiaDTO;
import com.backend.ISP63.model.Imagen;
import com.backend.ISP63.model.Noticia;
import com.backend.ISP63.repository.NoticiaRepository;
import com.backend.ISP63.service.ImagenService;
import com.backend.ISP63.service.NoticiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NoticiaServiceImpl implements NoticiaService {

    @Autowired
    NoticiaRepository noticiaRepository;

    @Autowired
    private ImagenService imagenService; // Inyecta el servicio de imagen


    @Override
    public void delete(Integer id) {
        Noticia noticia = noticiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("no se encontro el id"));
        noticiaRepository.delete(noticia);
    }



    public boolean exists(Integer id) {
        Optional<Noticia> noticiaOptional = noticiaRepository.findById(id);
        if (noticiaOptional.isEmpty()) {
            return false;
        } else
            return true;
    }

    @Override
    public NoticiaDTO findById(Integer id) {
        Noticia noticia = noticiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("noticia con id "
                        + id + " no se encontro"));

        // Verificamos si el logo es null antes de acceder a sus propiedades
        ImagenDTO imagenDTO = null;

        // Creamos el DTO, usando null para la imagen si no existe
        if (noticia.getImagen() != null) {
            imagenDTO = new ImagenDTO(
                    noticia.getImagen().getId(),
                    noticia.getImagen().getUrl(),
                    noticia.getImagen().getAlt(),
                    noticia.getImagen().getNombre()
            );
        }
        NoticiaDTO noticiaDTO = new NoticiaDTO(
                noticia.getId(),
                noticia.getFecha(),
                noticia.getTitulo(),
                noticia.getSubtitulo(),
                noticia.getDescripcion(),
                noticia.getTexto(),
                imagenDTO, // Puede ser null si no hay logo
                noticia.isVigente()

                );
        return noticiaDTO;
    }

    @Override
    public NoticiaDTO patchnoticia(Integer id, NoticiaDTO noticiaDTO) {
        try {
            NoticiaDTO c = this.findById(id);
            c.setFecha(noticiaDTO.getFecha());
            c.setTitulo(noticiaDTO.getTitulo());
            c.setSubtitulo(noticiaDTO.getSubtitulo());
            c.setDescripcion(noticiaDTO.getDescripcion());
            c.setTexto(noticiaDTO.getTexto());
            c.setImagen(noticiaDTO.getImagen());
            c.setVigente(noticiaDTO.isVigente());

            Noticia noticia = new Noticia(id,
                    c.getFecha(),
                    c.getTitulo(),
                    c.getSubtitulo(),
                    c.getDescripcion(),
                    c.getTexto(),
                   new Imagen(c.getImagen().getId(),
                           c.getImagen().getUrl(),
                           c.getImagen().getAlt(),
                           c.getImagen().getNombre()),
                    c.isVigente()
                    );
            noticiaRepository.save(noticia);
            return c;
        } catch (Exception e) {
            return null;

        }
    }

    @Override
    public NoticiaDTO save(NoticiaDTO noticiaDTO) {
        Noticia noticia = new Noticia(noticiaDTO.getId(),
                noticiaDTO.getFecha(),
                noticiaDTO.getTitulo(),
                noticiaDTO.getSubtitulo(),
                noticiaDTO.getDescripcion(),
                noticiaDTO.getTexto(),
                new Imagen(
                        noticiaDTO.getImagen().getId(),
                        noticiaDTO.getImagen().getUrl(),
                        noticiaDTO.getImagen().getAlt(),
                        noticiaDTO.getImagen().getNombre()
                ), noticiaDTO.isVigente());


        noticia = noticiaRepository.save(noticia);
        noticiaDTO.setId(noticia.getId());
        return noticiaDTO;
    }

    @Override
    public List<NoticiaDTO> findAll() {
        return noticiaRepository
                .findAll()
                .stream()
                .map(e -> new NoticiaDTO(
                                e.getId(),
                                e.getFecha(),
                                e.getTitulo(),
                                e.getSubtitulo(),
                                e.getDescripcion(),
                                e.getTexto(),
                                e.getImagen() != null
                                        ? new ImagenDTO(e.getImagen().getId(), e.getImagen().getUrl(), e.getImagen().getAlt(), e.getImagen().getNombre())
                                        : null, // Si el logo es null, asigna null al logo en el DTO
                        e.isVigente()

                        )
                ).collect(Collectors.toList());

    }

}

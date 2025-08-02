package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.*;
import com.backend.ISP63.enums.Sede;
import com.backend.ISP63.model.Carrera;
import com.backend.ISP63.model.Imagen;
import com.backend.ISP63.repository.CarreraRepository;
import com.backend.ISP63.service.CarreraService;
import com.backend.ISP63.service.ImagenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CarreraServiceImpl implements CarreraService {

    @Autowired
    CarreraRepository carrerarepository;

    @Autowired
    private ImagenService imagenService; // Inyecta el servicio de imagen

    @Override
    public CarreraDTO patchCarrera(Integer id, CarreraDTO carreraDTO) {
        try {
            CarreraDTO c = this.findById(id);
            c.setCarrera(carreraDTO.getCarrera());
            c.setPlan(carreraDTO.getPlan());
            c.setDuracion(carreraDTO.getDuracion());

            Carrera carrera = new Carrera(id,
                    c.getCarrera(),
                    c.getPlan(),
                    c.getDuracion(),
                    c.getCampoOcupacional(),
                    Sede.valueOf(c.getSede()) ,
                    new Imagen(c.getLogo().getId(), c.getLogo().getUrl(), c.getLogo().getAlt(), c.getLogo().getNombre()
                    ),c.getLink());
            carrerarepository.save(carrera);
            return c;
        } catch (Exception e) {
            return null;

        }
    }

    @Override
    public void delete(Integer id) {
        Carrera carrera = carrerarepository.findById(id)
                .orElseThrow(() -> new RuntimeException("no se encontro el id"));
        carrerarepository.delete(carrera);
    }

    public boolean exists(Integer id) {
        Optional<Carrera> carreraOptional = carrerarepository.findById(id);
        if (carreraOptional.isEmpty()) {
            //throw new RuntimeException("Id carrera invalido");
            return false;
        } else
            //Carrera e = carreraOptional.get();
            return true;
    }

    @Override
    public CarreraDTO findById(Integer id) {
        Carrera carrera = carrerarepository.findById(id)
                .orElseThrow(() -> new RuntimeException("carrera con id "
                        + id + " no se encontro"));

        // Verificamos si el logo es null antes de acceder a sus propiedades
        ImagenDTO logoDTO = null;
        if (carrera.getLogo() != null) {
            logoDTO = new ImagenDTO(
                    carrera.getLogo().getId(),
                    carrera.getLogo().getUrl(),
                    carrera.getLogo().getAlt(),
                    carrera.getLogo().getNombre()
            );
        }

        // Creamos el DTO, usando null para el logo si no existe
        CarreraDTO carreraDTO = new CarreraDTO(
                carrera.getId(),
                carrera.getCarrera(),
                carrera.getPlan(),
                carrera.getDuracion(),
                carrera.getCampoOcupacional(),
                carrera.getSede().toString(),
                logoDTO, carrera.getLink() // Puede ser null si no hay logo
        );        return carreraDTO;
    }

    @Override
    public CarreraDTO save(CarreraDTO carreraDTO) {
        Carrera carrera = new Carrera(carreraDTO.getId(),
                carreraDTO.getCarrera(),
                carreraDTO.getPlan(),
                carreraDTO.getDuracion(),
                carreraDTO.getCampoOcupacional(),
                Sede.valueOf( carreraDTO.getSede()),
                new Imagen(carreraDTO.getLogo().getId(), carreraDTO.getLogo().getUrl(), carreraDTO.getLogo().getAlt(), carreraDTO.getLogo().getNombre()
                    ),
                carreraDTO.getLink());


                carrera = carrerarepository.save(carrera);
        carreraDTO.setId(carrera.getId());
//            carreraDTO.setCarrera(carrera.getCarrera());
        //          carreraDTO.setPlan(carrera.getPlan());
        //         carreraDTO.setDuracion(carrera.getDuracion());
        return carreraDTO;
    }

    @Override
    public List<CarreraDTO> findAll() {
        return carrerarepository
                .findAll()
                .stream()
                .map(e -> new CarreraDTO(
                                e.getId(),
                                e.getCarrera(),
                                e.getPlan(),
                                e.getDuracion(),
                                e.getCampoOcupacional(),
                                e.getSede().getDisplayName(),
                                e.getLogo() != null
                                    ? new ImagenDTO(e.getLogo().getId(), e.getLogo().getUrl(), e.getLogo().getAlt(), e.getLogo().getNombre())
                                    : null // Si el logo es null, asigna null al logo en el DTO
                                ,e.getLink()

                        )
                ).collect(Collectors.toList());

    }

    @Override
    public List<CarreraGetDTO> findAllMin() {
        return carrerarepository
                .findAll()
                .stream()
                .map(e -> new CarreraGetDTO(
                                e.getPlan().toString(),
                                e.getId(),
                                e.getCampoOcupacional(),
                                "18 a 23",
                                e.getCarrera(),
                                e.getSede().getDisplayName(),
                                Optional.ofNullable(e.getLogo()).map(Imagen::getId).orElse(-1),
                                e.getLink()
                        )
                ).collect(Collectors.toList());



    }

    @Override
    public List<CarreraDTOconFile> findAllconFiles() {
        return carrerarepository
                .findAll()
                .stream()
                .map(e -> new CarreraDTOconFile(
                                e.getId(),
                                e.getCarrera(),
                                e.getPlan(),
                                e.getDuracion(),
                                e.getCampoOcupacional(),
                                e.getSede().getDisplayName(),
                                e.getLogo() != null
                                        ? new ImagenFileDTO(
                                        e.getLogo().getId(),
                                        e.getLogo().getUrl(),
                                        e.getLogo().getAlt(),
                                        e.getLogo().getNombre(),
                                        imagenService.getFile(e.getLogo().getId()) // Llama al servicio aquí
                                )
                                        : null // Si el logo es null, asigna null al logo en el DTO
                                ,e.getLink()
                        )
                )
                .collect(Collectors.toList());

    }


}

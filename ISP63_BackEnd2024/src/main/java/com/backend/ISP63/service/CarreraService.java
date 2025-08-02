package com.backend.ISP63.service;

import com.backend.ISP63.dto.CarreraDTO;
import com.backend.ISP63.dto.CarreraDTOconFile;
import com.backend.ISP63.dto.CarreraGetDTO;
import com.backend.ISP63.dto.ImagenDTO;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface CarreraService {

    public CarreraDTO save (CarreraDTO carreraDTO);
    public List<CarreraDTO> findAll();
    public CarreraDTO findById(Integer id);
    public CarreraDTO patchCarrera(Integer id, CarreraDTO carreraDTO);
    public void  delete (Integer id);
    public List<CarreraGetDTO> findAllMin();

    public List<CarreraDTOconFile> findAllconFiles();

}

package com.backend.ISP63.service;


import com.backend.ISP63.dto.ImagenDTO;
import com.backend.ISP63.dto.ImagenFileDTO;
import com.backend.ISP63.model.Imagen;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.sql.Blob;
import java.util.List;
import java.util.Optional;

public interface ImagenService {

    List<ImagenDTO> getAll();
    ImagenDTO findById(Integer id) throws Exception;
    public ImagenDTO saveImagen(MultipartFile file,String alt) throws IOException ;
    public File getArchivoImagen(Integer id);
    public List<ImagenFileDTO> getAllFile();

    public byte[] getFile(Integer id);
}
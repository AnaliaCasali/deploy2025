package com.backend.ISP63.service;

import com.backend.ISP63.dto.CarreraDTO;
import com.backend.ISP63.dto.CarreraGetDTO;
import com.backend.ISP63.dto.ImagenDTO;
import com.backend.ISP63.dto.NoticiaDTO;
import com.backend.ISP63.model.Noticia;
import java.util.List;

public interface NoticiaService {

    public NoticiaDTO save (NoticiaDTO noticiaDTO);
    public List<NoticiaDTO> findAll();
    public NoticiaDTO findById(Integer id);
    public NoticiaDTO patchnoticia(Integer id, NoticiaDTO noticiaDTO);
    public void  delete (Integer id);
}

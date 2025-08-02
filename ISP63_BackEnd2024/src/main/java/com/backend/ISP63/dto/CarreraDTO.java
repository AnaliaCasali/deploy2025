package com.backend.ISP63.dto;

import com.backend.ISP63.enums.Sede;
import com.backend.ISP63.model.Imagen;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarreraDTO {

    private int id;
    private String carrera;
    private String plan;
    private int duracion;
    private String campoOcupacional;
    private String sede;
    private ImagenDTO logo;
    private String link;
}



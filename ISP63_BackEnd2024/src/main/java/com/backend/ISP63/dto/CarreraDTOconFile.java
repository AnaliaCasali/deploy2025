package com.backend.ISP63.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarreraDTOconFile {

    private int id;
    private String carrera;
    private String plan;
    private int duracion;
    private String campoOcupacional;
    private String sede;
    private ImagenFileDTO logo;
    private String link;
}



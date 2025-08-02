package com.backend.ISP63.dto;

import com.backend.ISP63.enums.Sede;
import com.backend.ISP63.model.Imagen;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CarreraGetDTO {

    private String nro_plan;
    private int id;
    private String campo_ocupacional;
    private String horario;
    private String nombre;
    private String sede;
    private int imagen_id;
    private String link;



}

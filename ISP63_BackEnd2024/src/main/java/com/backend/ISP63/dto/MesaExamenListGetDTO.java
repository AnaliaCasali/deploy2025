package com.backend.ISP63.dto;


import com.backend.ISP63.enums.LlamadoTurno;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MesaExamenListGetDTO {

    private Long id; //id mesa
    private String llamado;
    private String fechayHora;

    private int anio;
    private String asignatura;
    private int idCarrera;
    private String carrera;

    private String tribunal;
}

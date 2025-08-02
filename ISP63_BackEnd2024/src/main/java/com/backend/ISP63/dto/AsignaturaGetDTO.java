package com.backend.ISP63.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsignaturaGetDTO {
    private int anio;
    private int carga_horaria;
    private String duracion;
    private int carrera_id;
    private int id;
    private String asignatura;
    private String correlativa_cursar;
    private String correlativa_rendir;
    private String tipo;


}

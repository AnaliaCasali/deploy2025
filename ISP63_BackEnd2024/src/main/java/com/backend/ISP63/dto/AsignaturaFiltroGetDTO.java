package com.backend.ISP63.dto;

import com.backend.ISP63.enums.Periodo;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.Carrera;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsignaturaFiltroGetDTO {
    private int id;
    private String nombre;
}

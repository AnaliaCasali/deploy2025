package com.backend.ISP63.dto;

import com.backend.ISP63.enums.Periodo;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.Carrera;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AsignaturaDTO {
    private int id;
    private String nombre;
    private String detalle;
    private int anio;
    private int horas;
    private String orientacion;
    private boolean electiva;
    private Periodo periodo;
    private Carrera carrera;
    private List<Asignatura> correlativasCursarIds; // IDs de asignaturas correlativas para cursar
    private List<Asignatura> correlativasRendirIds; // I

}

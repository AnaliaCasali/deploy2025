package com.backend.ISP63.dto;

import com.backend.ISP63.model.ItemInscripcionMesaExamen;
import com.backend.ISP63.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InscripcionMesaExamenGetDTO {

     private Long idInsc;
     private Long idMesa;
     private String nombreApellido;
     private String dni;
     private String carrera;
     private int idcarrera;
     private String anio;
     private String materia;
     private String condicion;
     private String turnoLlamado;
}

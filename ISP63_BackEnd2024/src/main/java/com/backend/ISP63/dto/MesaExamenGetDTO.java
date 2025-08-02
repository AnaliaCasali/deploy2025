package com.backend.ISP63.dto;

import com.backend.ISP63.enums.LlamadoTurno;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.Turno;
import com.backend.ISP63.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MesaExamenGetDTO {

    private Long idMesa;

    private LocalDateTime fechaHora;

    private LlamadoTurno llamado;

    private String turno;

    private String asignatura;
    private String carrera;
    private  int anio;
    private  String Tribunal;
}

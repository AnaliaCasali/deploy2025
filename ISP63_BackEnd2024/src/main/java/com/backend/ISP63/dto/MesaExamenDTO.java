package com.backend.ISP63.dto;

import com.backend.ISP63.enums.LlamadoTurno;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.Turno;
import com.backend.ISP63.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MesaExamenDTO {

    private Long id;

    private LocalDateTime fechaHora;

    private LlamadoTurno llamado;

    private User presidente; // Cambiado a User

    private User vocal1; // Cambiado a User

    private User vocal2; // Cambiado a User

    private Turno turno;

    private Asignatura asignatura;
}

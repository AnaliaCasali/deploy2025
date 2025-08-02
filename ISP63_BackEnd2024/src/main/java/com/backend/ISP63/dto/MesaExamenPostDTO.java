package com.backend.ISP63.dto;

import com.backend.ISP63.enums.LlamadoTurno;
import com.backend.ISP63.model.Asignatura;
import com.backend.ISP63.model.Turno;
import com.backend.ISP63.model.User;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MesaExamenPostDTO {

    private Long id;

    private LocalDateTime fechaHora;

    private LlamadoTurno llamado;

    private String presidente; // Cambiado a User

    private String vocal1; // Cambiado a User

    private String vocal2; // Cambiado a User

    private Long turno;

    private int asignatura;
}

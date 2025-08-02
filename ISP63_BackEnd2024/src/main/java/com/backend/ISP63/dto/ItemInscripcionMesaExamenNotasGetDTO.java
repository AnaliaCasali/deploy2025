package com.backend.ISP63.dto;

import com.backend.ISP63.enums.LlamadoTurno;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemInscripcionMesaExamenNotasGetDTO {

    private Integer nota;
    private String idAsignatura;
    private LlamadoTurno llamado;
}

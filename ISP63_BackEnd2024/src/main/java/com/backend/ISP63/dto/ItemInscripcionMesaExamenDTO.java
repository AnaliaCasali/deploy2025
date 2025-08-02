package com.backend.ISP63.dto;

import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.model.MesaExamen;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemInscripcionMesaExamenDTO {
    private Long id;

    private InscripcionMesaExamen inscripcion;

    private MesaExamen mesaExamen;

    private EstadoInscripcion estado;

    private Integer nota = null;

    private Boolean ausente = true;
}

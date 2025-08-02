package com.backend.ISP63.dto;

import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.model.MesaExamen;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemInscripcionMesaExamenSaveDTO {
    private Long id;

    private int inscripcion;

    private int mesaExamen;

    private String estado;
}

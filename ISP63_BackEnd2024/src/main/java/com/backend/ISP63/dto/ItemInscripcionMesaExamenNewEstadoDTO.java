package com.backend.ISP63.dto;

import com.backend.ISP63.enums.EstadoInscripcion;
import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.model.MesaExamen;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ItemInscripcionMesaExamenNewEstadoDTO {
    private List<Long> aceptados;
    private List<Long> rechazados;
}

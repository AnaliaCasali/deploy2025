package com.backend.ISP63.dto;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TurnoDTO {

    private Long id;
    private String turno;
    private LocalDate periodoInscripcionDesde;
    private LocalDate periodoInscripcionHasta;
    private LocalDate periodoExamenDesde;
    private LocalDate periodoExamenHasta;
    private Boolean vigente;

}

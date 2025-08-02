package com.backend.ISP63.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventoGetDTO {

    private Long id;
    private LocalDate fecha;
    private String titulo;
    private String subtitulo;
    private String descripcion;
    private Long imagenId; // Solo el ID de la imagen asociada
}

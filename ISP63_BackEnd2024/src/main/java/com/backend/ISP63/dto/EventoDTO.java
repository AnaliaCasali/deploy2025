package com.backend.ISP63.dto;

import lombok.*;

import java.time.LocalDate;
import java.util.Set;
@Getter
@Setter
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EventoDTO {
    private Long id;
    private LocalDate fecha;
    private String titulo;
    private String subtitulo;
    private String descripcion;
    private ImagenDTO imagen;

}

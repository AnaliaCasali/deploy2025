package com.backend.ISP63.dto;

import com.backend.ISP63.enums.Sede;
import com.backend.ISP63.model.Imagen;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoticiaDTO {
    private int id;

    private LocalDate fecha;

    private String titulo;

    private String subtitulo;

    private String descripcion;

    private String texto;

    private ImagenDTO imagen;
    private boolean vigente;
}

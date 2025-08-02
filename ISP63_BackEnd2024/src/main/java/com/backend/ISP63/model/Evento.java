package com.backend.ISP63.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="Eventos")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Evento {
    @Id
    @GeneratedValue( strategy = GenerationType.IDENTITY)
    Long id;
    LocalDate  fecha;
    String titulo;
    String subtitulo;
    String descripcion;

    @ManyToOne(fetch = FetchType.LAZY) // FetchType.LAZY para evitar cargas innecesarias
    @JoinColumn(name = "imagen_id", nullable = true) // Esto permite que la columna sea opcional
    private Imagen imagen;

}

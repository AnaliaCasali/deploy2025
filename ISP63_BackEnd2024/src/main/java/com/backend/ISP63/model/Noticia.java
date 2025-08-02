package com.backend.ISP63.model;

import com.backend.ISP63.dto.ImagenDTO;
import com.backend.ISP63.dto.ImagenFileDTO;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Noticias")
public class Noticia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate fecha;

    private String titulo;

    private String subtitulo;

    @Column(length = 1000)  // Para ajustar la longitud según tus necesidades
    private String descripcion;

    @Lob
    private String texto;

    @ManyToOne(fetch = FetchType.LAZY) // FetchType.LAZY para evitar cargas innecesarias
    @JoinColumn(name = "imagen_id", nullable = true) // Esto permite que la columna sea opcional
    private Imagen imagen;


    private boolean vigente;

}

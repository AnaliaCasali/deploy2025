package com.backend.ISP63.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name="inscripcion_mesas_examen")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class InscripcionMesaExamen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "dni", nullable = false)
    private User estudiante;

    @Column(nullable = false)
    private LocalDateTime fechaHoraInscripcion;


    @OneToMany(mappedBy = "inscripcion", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ItemInscripcionMesaExamen> items;
}

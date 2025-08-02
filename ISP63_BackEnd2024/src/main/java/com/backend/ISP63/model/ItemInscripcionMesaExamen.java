package com.backend.ISP63.model;

import com.backend.ISP63.enums.EstadoInscripcion;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "item_inscripcion_mesas_examen")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ItemInscripcionMesaExamen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_inscripcion", nullable = false)
    private InscripcionMesaExamen inscripcion;

    @ManyToOne
    @JoinColumn(name = "id_mesa_examen", nullable = false)
    private MesaExamen mesaExamen;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoInscripcion estado;

    @Column(nullable = true)
    private Integer nota;

    @Column(nullable = false, columnDefinition = "boolean default true")
    private Boolean ausente = true;

}

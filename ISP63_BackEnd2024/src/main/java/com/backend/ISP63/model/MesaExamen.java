package com.backend.ISP63.model;

import com.backend.ISP63.enums.LlamadoTurno;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name="mesas_examen")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class MesaExamen {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fechaHora;

    @Enumerated(EnumType.STRING)
    private LlamadoTurno llamado;

    @ManyToOne
    @JoinColumn(name = "id_presidente", nullable = false)
    private User presidente; // Cambiado a User

    @ManyToOne
    @JoinColumn(name = "id_vocal1", nullable = false)
    private User vocal1; // Cambiado a User

    @ManyToOne
    @JoinColumn(name = "id_vocal2", nullable = false)
    private User vocal2; // Cambiado a User

    @ManyToOne
    @JoinColumn(name = "id_turno", nullable = false)
    private Turno turno;

    @ManyToOne
    @JoinColumn(name = "id_asignatura", nullable = false)
    private Asignatura asignatura;

}

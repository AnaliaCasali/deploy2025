package com.backend.ISP63.model;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name="turnos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Turno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String turno;

    @Column(name = "periodo_inscripcion_desde")
    private LocalDate periodoInscripcionDesde;

    @Column(name = "periodo_inscripcion_hasta")
    private LocalDate periodoInscripcionHasta;

    @Column(name = "periodo_examen_desde")
    private LocalDate periodoExamenDesde;

    @Column(name = "periodo_examen_hasta")
    private LocalDate periodoExamenHasta;

    @Column
    private Boolean vigente;

}

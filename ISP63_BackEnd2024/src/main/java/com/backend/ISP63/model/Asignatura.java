package com.backend.ISP63.model;
import com.backend.ISP63.enums.Periodo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@Entity
@Table(name = "asignaturas")
@AllArgsConstructor
@NoArgsConstructor
public class Asignatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String nombre;

    @Column
    private String detalle;

    @Column
    private int anio;


    @Column
    private int horas;

    @Column
    private String orientacion;

    @Column
    private boolean electiva;

    @Enumerated(EnumType.STRING)
    private Periodo periodo;

    @ManyToOne
    @JoinColumn(name = "carrera_id")
    private Carrera carrera;


    @ManyToMany
    @JoinTable(
            name = "asignatura_correlativa_cursar",
            joinColumns = @JoinColumn(name = "asignatura_id"),
            inverseJoinColumns = @JoinColumn(name = "correlativa_cursar_id")
    )
    private List<Asignatura> correlativasCursar;


    @ManyToMany
    @JoinTable(
            name = "asignatura_correlativa_rendir",
            joinColumns = @JoinColumn(name = "asignatura_id"),
            inverseJoinColumns = @JoinColumn(name = "correlativa_rendir_id")
    )
    private List<Asignatura> correlativasrendir;
}
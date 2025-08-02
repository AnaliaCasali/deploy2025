package com.backend.ISP63.model;

import com.backend.ISP63.enums.Sede;
import jakarta.persistence.*;
import lombok.*;

import java.util.Objects;

@Entity
@Table(name="Carreras")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Carrera{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name="carrera")
    private String carrera;
    @Column (name="plan")
    private String plan;
    @Column(name="duracion")
    private int duracion;

    @Column(name="campo_ocupacional")
    private String campoOcupacional;

    @Enumerated(EnumType.STRING)
    private Sede sede;

    @ManyToOne(fetch = FetchType.LAZY) // FetchType.LAZY para evitar cargas innecesarias
    @JoinColumn(name = "imagen_id", nullable = true) // Esto permite que la columna sea opcional
    private Imagen logo;

    @Column(name="link")
    private String link;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Carrera carrera1 = (Carrera) o;
        return duracion == carrera1.duracion && Objects.equals(carrera.toLowerCase(), carrera1.carrera.toLowerCase()) && Objects.equals(plan.toLowerCase(), carrera1.plan.toLowerCase());
    }

    @Override
    public int hashCode() {
        return Objects.hash(carrera.toLowerCase(), plan.toLowerCase(), duracion);
    }
}

package com.backend.ISP63.model;

import com.backend.ISP63.enums.Provincia;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data // Lombok para generar getters, setters, toString, equals y hashCode
@NoArgsConstructor // Lombok para constructor sin argumentos
@AllArgsConstructor // Lombok para constructor con todos los argumentos
public class Localidad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String localidad;

    private String CP; // Código Postal

    @Enumerated(EnumType.STRING)
    private Provincia provincia;
}

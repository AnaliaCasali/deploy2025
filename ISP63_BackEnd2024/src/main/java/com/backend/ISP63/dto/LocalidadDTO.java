package com.backend.ISP63.dto;

import com.backend.ISP63.enums.Provincia;
import com.backend.ISP63.enums.Sede;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocalidadDTO {
    private Integer id;
    private String localidad;
    private String CP; // Código Postal
    private String provincia;
    private String pais;
}



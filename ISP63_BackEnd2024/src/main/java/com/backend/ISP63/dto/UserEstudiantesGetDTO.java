package com.backend.ISP63.dto;

import com.backend.ISP63.enums.EstadoCivil;
import com.backend.ISP63.enums.Genero;
import com.backend.ISP63.model.Carrera;
import com.backend.ISP63.model.Localidad;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEstudiantesGetDTO {

    private String dni;
    private String apellidoyapellido;
    private int idLocalidad;
    private String localidad;
    private String telefono;
    private String email;
    private int idCarrera;
    private String carrera;
}

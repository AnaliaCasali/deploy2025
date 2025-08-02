package com.backend.ISP63.authsecurity.dto;

import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.enums.EstadoCivil;
import com.backend.ISP63.enums.Genero;
import com.backend.ISP63.model.Localidad;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequestDTO {

    private String dni; // Usamos DNI como clave primaria
    private String apellido;
    private String nombre;
    private String password;
    private Genero genero;
    private String domicilio;
    private Integer idLocalidad;
    private String telefono;
    private String email;
    private LocalDate fechaNacimiento;
    private EstadoCivil estadoCivil;
}

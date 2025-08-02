package com.backend.ISP63.dto;

import com.backend.ISP63.enums.*;
import com.backend.ISP63.model.Carrera;
import com.backend.ISP63.model.Localidad;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String dni; // Usamos DNI como clave primaria
    private String apellido;
    private String nombre;
    private Genero genero;
    private String domicilio;
    private Localidad localidad;
    private String telefono;
    private String email;
    private LocalDate fechaNacimiento;
    private EstadoCivil estadoCivil;
    String username;
    private String rol;
    private CarreraDTO carrera;//  solo tendra carrera si es estudiante
}

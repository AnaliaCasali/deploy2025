package com.backend.ISP63.model;

import com.backend.ISP63.enums.EstadoCivil;
import com.backend.ISP63.enums.Genero;
import com.backend.ISP63.enums.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode
@Table(name="usuario",
uniqueConstraints =
{@UniqueConstraint(columnNames = {"username"})})

public class User implements UserDetails {
    @Id
    private String dni; // Usamos DNI como clave primaria
    @Column(nullable = false)
    private String apellido;
    @Column(nullable = false)
    private String nombre;
    @Column(nullable = false)
    private String password;
    @Enumerated(EnumType.STRING)
    private Genero genero;

    private String domicilio;

    @ManyToOne
    @JoinColumn(name="localidad_id", nullable = true) // Esto permitirá que sea null
    private Localidad localidad;
    private String telefono;
    @Email
    private String email;
    @Column(name = "fecha_nacimiento")
    private LocalDate fechaNacimiento;
    @Column(name = "estado_civil")
    @Enumerated(EnumType.STRING)
    private EstadoCivil estadoCivil;
    @Column(nullable = false)
    String username;
    @Enumerated(EnumType.STRING)
    private Role rol;  // Aquí indicamos el rol (DOCENTE, ADMINISTRADOR, etc.)
    @ManyToOne
    @JoinColumn(name="id_carrera", nullable = true) // Esto permitirá que sea null
    private Carrera carrera;              // ya que solo tendra carrera si es estudiante

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority((rol.name())));
    }

    @Override
    public boolean isAccountNonExpired() {
        return UserDetails.super.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return UserDetails.super.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return UserDetails.super.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return UserDetails.super.isEnabled();
    }

    private boolean passwordChangeRequired;
}

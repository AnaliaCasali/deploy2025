package com.backend.ISP63.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder()
@Table(name = "Imagenes")
public class Imagen {
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column(name = "ID")
private int id;

@Column(name = "URL", length = 2048)
private String url;

@Column(name = "ALT", length = 1000)
private String alt;

private String nombre;

}


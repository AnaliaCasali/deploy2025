package com.backend.ISP63.dto;

import com.backend.ISP63.model.ItemInscripcionMesaExamen;
import com.backend.ISP63.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InscripcionMesaExamenDTO {

     private Long id;
     private User estudiante;
     private LocalDateTime fechaHoraInscripcion;
     private Set<ItemInscripcionMesaExamen> items;
}

package com.backend.ISP63.dto;


import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificacionDTO {
    private Long id;
    private String mensaje;
    private boolean leida;
    private LocalDateTime fechaCreacion;
    private String usuarioDestinoDni;
    private String usuarioDestinoNombre;
}

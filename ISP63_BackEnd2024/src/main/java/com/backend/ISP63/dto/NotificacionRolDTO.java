package com.backend.ISP63.dto;


import jdk.dynalink.linker.LinkerServices;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificacionRolDTO {
    private Long id;
    private String mensaje;
    private boolean leida;
    private LocalDateTime fechaCreacion;
    private List<String> rol;
}

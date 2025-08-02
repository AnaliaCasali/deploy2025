package com.backend.ISP63.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class InscripcionMesaExamenSaveDTO {

     private String dniUsuario;
     private List<Long> mesasExamenIds;
     private String estado;
}

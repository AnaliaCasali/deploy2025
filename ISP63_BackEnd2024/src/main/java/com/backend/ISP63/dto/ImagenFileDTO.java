package com.backend.ISP63.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@Data
public class ImagenFileDTO {
    private int id;
    private String url;
    private String alt;
    private String nombre;
    private byte[] imagen;
}

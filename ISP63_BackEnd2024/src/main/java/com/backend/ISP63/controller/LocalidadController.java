package com.backend.ISP63.controller;

import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.service.LocalidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/auth/localidades")
public class LocalidadController {

    @Autowired
    private LocalidadService localidadService;

    @GetMapping
    public ResponseEntity<List<LocalidadDTO>> findAll() {
        try {
            List<LocalidadDTO> listado = localidadService.findAll();
            return new ResponseEntity<>(listado, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }

    }

}

package com.backend.ISP63.authsecurity.auth;

import com.backend.ISP63.authsecurity.dto.AuthResponseDTO;
import com.backend.ISP63.authsecurity.dto.LoginRequestDTO;
import com.backend.ISP63.authsecurity.dto.RegisterRequestDTO;
import com.backend.ISP63.authsecurity.service.AuthService;
import com.backend.ISP63.dto.UserDTO;
import com.backend.ISP63.model.User;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// para controllador para autenticar
//es publico
@RestController
@RequestMapping("/auth")
@AllArgsConstructor
@CrossOrigin(origins = {"http://ies63lastoscas.edu.ar","https://ies63lastoscas.edu.ar"})

public class AuthController {

    @Autowired
    private final AuthService authService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginRequestDTO request)
    {        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponseDTO> register(@RequestBody RegisterRequestDTO request)
    {        return ResponseEntity.ok(authService.register(request));}




}

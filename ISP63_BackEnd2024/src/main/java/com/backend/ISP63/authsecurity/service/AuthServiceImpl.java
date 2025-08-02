package com.backend.ISP63.authsecurity.service;

import com.backend.ISP63.authsecurity.dto.AuthResponseDTO;
import com.backend.ISP63.authsecurity.dto.LoginRequestDTO;
import com.backend.ISP63.authsecurity.dto.RegisterRequestDTO;
import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.enums.Provincia;
import com.backend.ISP63.enums.Role;
import com.backend.ISP63.model.Localidad;
import com.backend.ISP63.model.User;
import com.backend.ISP63.repository.UserRepository;
import com.backend.ISP63.service.LocalidadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    @Autowired
    private LocalidadService localidadService;
    @Override
    public AuthResponseDTO register(RegisterRequestDTO request) {
        Localidad l= localidadService.findById(request.getIdLocalidad()).orElse(null);

        User user = User.builder()
                .username(request.getDni())
                .dni(request.getDni())
                .apellido(request.getApellido())
                .nombre(request.getNombre())
                .password(passwordEncoder.encode(request.getPassword()))
                .genero(request.getGenero())
                .domicilio(request.getDomicilio())
                .localidad(l)
                .telefono(request.getTelefono())
                .email(request.getEmail())
                .fechaNacimiento(request.getFechaNacimiento())
                .username("IES63"+request.getDni())
                .rol(Role.USER)
                .build();
        userRepository.save(user);

        return AuthResponseDTO.builder()
                .token(jwtService.getToken(user))
                .build();
    }
    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()));
        UserDetails user =
                userRepository.findByUsername(request.getUsername())
                        .orElseThrow();
        User userDTO =
                userRepository.findByUsername(request.getUsername())
                        .orElseThrow();

        String token = jwtService.getToken(user);
        return AuthResponseDTO.builder()
                .token(token)
                .build();
    }
}

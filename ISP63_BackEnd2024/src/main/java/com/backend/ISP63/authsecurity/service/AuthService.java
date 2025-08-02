package com.backend.ISP63.authsecurity.service;

import com.backend.ISP63.authsecurity.dto.AuthResponseDTO;
import com.backend.ISP63.authsecurity.dto.LoginRequestDTO;
import com.backend.ISP63.authsecurity.dto.RegisterRequestDTO;

public interface AuthService {
       public AuthResponseDTO register(RegisterRequestDTO request);
       public AuthResponseDTO login(LoginRequestDTO request) ;

}

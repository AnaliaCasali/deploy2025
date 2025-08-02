package com.backend.ISP63.service;

import com.backend.ISP63.dto.ItemInscripcionMesaExamenDTO;
import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.dto.UserDTO;
import com.backend.ISP63.dto.UserEstudiantesGetDTO;
import com.backend.ISP63.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    public List<UserDTO> findAll();

    UserDTO findById(String dni) throws Exception;
    User findUserById(String dni) throws Exception;
    List<UserDTO> findAllByRol(String rol) throws Exception ;
    UserDTO updateUser(String dni, User updatedUser); // Nuevo m
    UserDTO updatePassword(String dni, String newPassword);
    UserDTO assignCareer(String dni, Integer careerId);

    List<LocalidadDTO> getLocalidadesUnicas();
    UserDTO asignarRol(String dni, String rol);


    List<UserEstudiantesGetDTO> findAllEstud();


    public Optional<String> getEmailByDni(String dni);
    }

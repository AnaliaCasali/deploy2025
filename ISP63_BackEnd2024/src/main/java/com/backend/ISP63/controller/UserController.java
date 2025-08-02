package com.backend.ISP63.controller;

import com.backend.ISP63.dto.LocalidadDTO;
import com.backend.ISP63.dto.UserDTO;
import com.backend.ISP63.dto.UserEstudiantesGetDTO;
import com.backend.ISP63.exceptions.ResourceNotFoundException;
import com.backend.ISP63.model.User;
import com.backend.ISP63.repository.UserRepository;
import com.backend.ISP63.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuario")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping()
    public ResponseEntity<List<UserDTO>> findAll() {
        try {
            List<UserDTO> response = userService.findAll();
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{dni}")
    public ResponseEntity<UserDTO> findById(@PathVariable String dni) throws Exception {
        try {
            UserDTO response = userService.findById(dni);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/rol/{rol}")
    public ResponseEntity<List<UserDTO>> findByRol(@PathVariable String rol) throws Exception {

        try {
            List<UserDTO> response = userService.findAllByRol(rol);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    // Endpoint para actualizar el usuario sin permitir cambiar DNI, username ni carrera
    @PutMapping("/update/{dni}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable String dni, @RequestBody User user) {
        UserDTO updatedUser = userService.updateUser(dni, user);
        return ResponseEntity.ok(updatedUser);
    }


    @PutMapping("/cambiarpassword/{dni}")
    public ResponseEntity<UserDTO> updatePassword(@PathVariable String dni, @RequestParam String newPassword) {
        UserDTO updatedUser = userService.updatePassword(dni, newPassword);
        return ResponseEntity.ok(updatedUser);
    }

    @PutMapping("/asignarRol/{dni}")
    public ResponseEntity<UserDTO> assignCareer(@PathVariable String dni, @RequestParam String rol) {
        UserDTO updatedUser = userService.asignarRol(dni, rol);
        return ResponseEntity.ok(updatedUser);
    }

    // Endpoint para obtener localidades sin repeticiones
    @GetMapping("/localidades")
    public ResponseEntity<List<LocalidadDTO>> getLocalidadesUnicas() {
        List<LocalidadDTO> localidades = userService.getLocalidadesUnicas();
        if (localidades.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Devuelve 204 No Content
        }

        return new ResponseEntity<>(localidades, HttpStatus.OK); // Devuelve la lista con código 200 OK
    }

    @PutMapping("/asignarCarrera/{dni}")
    public ResponseEntity<UserDTO> assignCareer(@PathVariable String dni, @RequestParam Integer careerId) {
        UserDTO updatedUser = userService.assignCareer(dni, careerId);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/todosAlumnos")
    public List<UserEstudiantesGetDTO> getAllEstudiantes() {

        return userService.findAllEstud();
    }

}

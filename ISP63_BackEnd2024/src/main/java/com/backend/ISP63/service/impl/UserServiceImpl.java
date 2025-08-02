package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.*;
import com.backend.ISP63.enums.EstadoCivil;
import com.backend.ISP63.enums.Genero;
import com.backend.ISP63.enums.Role;
import com.backend.ISP63.model.Carrera;
import com.backend.ISP63.model.Localidad;
import com.backend.ISP63.model.User;
import com.backend.ISP63.repository.UserRepository;
import com.backend.ISP63.repository.CarreraRepository;
import com.backend.ISP63.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private CarreraRepository carreraRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<UserDTO> findAll() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map((e) -> new UserDTO(
                        e.getDni(),
                        e.getApellido(),
                        e.getNombre(),
                        e.getGenero(),
                        e.getDomicilio(),
                        e.getLocalidad(),
                        e.getTelefono(),
                        e.getEmail(),
                        e.getFechaNacimiento(),
                        e.getEstadoCivil(),
                        e.getUsername(),
                        e.getRol().toString(),
                        e.getCarrera()!= null
                                ? new CarreraDTO(e.getCarrera().getId(),
                                e.getCarrera().getCarrera(),
                                e.getCarrera().getPlan(),
                                e.getCarrera().getDuracion(),
                                e.getCarrera().getCampoOcupacional(),
                                e.getCarrera().getSede().getDisplayName(),
                                e.getCarrera().getLogo() != null
                                        ? new ImagenDTO(e.getCarrera().getLogo().getId(), e.getCarrera().getLogo().getUrl(), e.getCarrera().getLogo().getAlt(), e.getCarrera().getLogo().getNombre())
                                        : null,
                                e.getCarrera().getLink())
                                : null // Si el logo es null, asigna null al logo en el DTO
                ))
                .collect(Collectors.toList());

    }

    @Override
    public UserDTO findById(String dni) throws Exception {
        User e = userRepository.findById(dni)
                .orElseThrow(() -> new Exception("Usuario con DNI " + dni + " no encontrado"));

        UserDTO userDTO = new UserDTO(
                e.getDni(),
                e.getApellido(),
                e.getNombre(),
                e.getGenero(),
                e.getDomicilio(),
                e.getLocalidad(),
                e.getTelefono(),
                e.getEmail(),
                e.getFechaNacimiento(),
                e.getEstadoCivil(),
                e.getUsername(),
                e.getRol().toString(),
                e.getCarrera()!= null
                        ? new CarreraDTO(e.getCarrera().getId(),
                        e.getCarrera().getCarrera(),
                        e.getCarrera().getPlan(),
                        e.getCarrera().getDuracion(),
                        e.getCarrera().getCampoOcupacional(),
                        e.getCarrera().getSede().getDisplayName(),
                        e.getCarrera().getLogo() != null
                                ? new ImagenDTO(e.getCarrera().getLogo().getId(), e.getCarrera().getLogo().getUrl(), e.getCarrera().getLogo().getAlt(), e.getCarrera().getLogo().getNombre())
                                : null,
                        e.getCarrera().getLink())
                        : null // Si el logo es null, asigna null al logo en el DTO
        );
        return userDTO;
    }

    @Override
    public List<UserDTO> findAllByRol(String rol) throws Exception {
        Role rolEnum;
        try {
            rolEnum= Role.valueOf(rol.toUpperCase()); // Asegurarse de que sea en mayúsculas
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Rol inválido: " + rol);
        }
        List<User> users = userRepository.findByRol(rolEnum);
        return users.stream()
                .map((e) -> new UserDTO(
                        e.getDni(),
                        e.getApellido(),
                        e.getNombre(),
                        e.getGenero(),
                        e.getDomicilio(),
                        e.getLocalidad(),
                        e.getTelefono(),
                        e.getEmail(),
                        e.getFechaNacimiento(),
                        e.getEstadoCivil(),
                        e.getUsername(),
                        e.getRol().toString(),
                        e.getCarrera()!= null
                                ? new CarreraDTO(e.getCarrera().getId(),
                                e.getCarrera().getCarrera(),
                                e.getCarrera().getPlan(),
                                e.getCarrera().getDuracion(),
                                e.getCarrera().getCampoOcupacional(),
                                e.getCarrera().getSede().getDisplayName(),
                                e.getCarrera().getLogo() != null
                                                ? new ImagenDTO(e.getCarrera().getLogo().getId(), e.getCarrera().getLogo().getUrl(), e.getCarrera().getLogo().getAlt(), e.getCarrera().getLogo().getNombre())
                                                        : null,
                                e.getCarrera().getLink())
                                : null // Si el logo es null, asigna null al logo en el DTO
                ))
                .collect(Collectors.toList());

    }

    @Override
    public User findUserById(String dni) throws Exception {
        User e = userRepository.findById(dni)
                .orElseThrow(() -> new Exception("Usuario con DNI " + dni + " no encontrado"));
        return e;
    }


    @Override
    public UserDTO updatePassword(String dni, String newPassword) {
        User user = userRepository.findById(dni)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordChangeRequired(false);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    // No permitir la edición de DNI, username y carrera

    @Override
    public UserDTO updateUser(String dni, User updatedUser) {
        User existingUser = userRepository.findById(dni)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));

        existingUser.setApellido(updatedUser.getApellido());
        existingUser.setNombre(updatedUser.getNombre());
        existingUser.setGenero(updatedUser.getGenero());
        existingUser.setDomicilio(updatedUser.getDomicilio());
        existingUser.setLocalidad(updatedUser.getLocalidad());
        existingUser.setTelefono(updatedUser.getTelefono());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setFechaNacimiento(updatedUser.getFechaNacimiento());
        existingUser.setEstadoCivil(updatedUser.getEstadoCivil());
        // No actualizamos el username, dni ni carrera
        User savedUser = userRepository.save(existingUser);
        return convertToDTO(savedUser);
    }
    @Override
    public UserDTO assignCareer(String dni, Integer careerId) {
        User user = userRepository.findById(dni)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Carrera carrera = carreraRepository.findById(careerId)
                .orElseThrow(() -> new IllegalArgumentException("Carrera no encontrada"));
        user.setCarrera(carrera);
        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    @Override
    public List<LocalidadDTO> getLocalidadesUnicas() {
        return userRepository.findAll()
                .stream()
                .map(user -> user.getLocalidad())
                .distinct()
                .map(localidad -> new LocalidadDTO(localidad.getId(),
                                localidad.getLocalidad(),
                                localidad.getCP(),
                                localidad.getProvincia().getNombre(),
                                localidad.getProvincia().getPais().getNombre())) // Ajusta según la entidad Localidad
                .collect(Collectors.toList());

    }


    @Override
    public UserDTO asignarRol(String dni, String rol) {
        User e = userRepository.findById(dni).orElse(null);
        Role rolEnum;
        UserDTO userDTO=null;
        try {
            rolEnum= Role.valueOf(rol.toUpperCase()); // Asegurarse de que sea en mayúsculas
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Rol inválido: " + rol);
        }
        if (e != null) {
            e.setRol(rolEnum); // Asigna el nuevo rol
            userRepository.save(e); // Guarda los cambios
            userDTO = new UserDTO(
                    e.getDni(),
                    e.getApellido(),
                    e.getNombre(),
                    e.getGenero(),
                    e.getDomicilio(),
                    e.getLocalidad(),
                    e.getTelefono(),
                    e.getEmail(),
                    e.getFechaNacimiento(),
                    e.getEstadoCivil(),
                    e.getUsername(),
                    e.getRol().toString(),
                    e.getCarrera()!= null
                            ? new CarreraDTO(e.getCarrera().getId(),
                            e.getCarrera().getCarrera(),
                            e.getCarrera().getPlan(),
                            e.getCarrera().getDuracion(),
                            e.getCarrera().getCampoOcupacional(),
                            e.getCarrera().getSede().getDisplayName(),
                            e.getCarrera().getLogo() != null
                                    ? new ImagenDTO(e.getCarrera().getLogo().getId(), e.getCarrera().getLogo().getUrl(), e.getCarrera().getLogo().getAlt(), e.getCarrera().getLogo().getNombre())
                                    : null,
                            e.getCarrera().getLink())
                            : null // Si el logo es null, asigna null al logo en el DTO
            );
        }
        return userDTO;
     }

    // Método para convertir User a UserDTO
    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setDni(user.getDni());
        userDTO.setApellido(user.getApellido());
        userDTO.setNombre(user.getNombre());
        userDTO.setGenero(user.getGenero());
        userDTO.setDomicilio(user.getDomicilio());
        userDTO.setLocalidad(user.getLocalidad());
        userDTO.setTelefono(user.getTelefono());
        userDTO.setEmail(user.getEmail());
        userDTO.setFechaNacimiento(user.getFechaNacimiento());
        userDTO.setEstadoCivil(user.getEstadoCivil());
        userDTO.setUsername(user.getUsername());
        userDTO.setRol(user.getRol().name());
        userDTO.setCarrera(

        user.getCarrera()!= null
                ? new CarreraDTO(user.getCarrera().getId(),
                user.getCarrera().getCarrera(),
                user.getCarrera().getPlan(),
                user.getCarrera().getDuracion(),
                user.getCarrera().getCampoOcupacional(),
                user.getCarrera().getSede().getDisplayName(),
                user.getCarrera().getLogo() != null
                        ? new ImagenDTO(user.getCarrera().getLogo().getId(), user.getCarrera().getLogo().getUrl(),
                        user.getCarrera().getLogo().getAlt(), user.getCarrera().getLogo().getNombre())
                        : null,
                user.getCarrera().getLink())
                : null // Si el logo es null, asigna null al logo en el DTO
        );
        return userDTO;
    }

    // lista todos los estuadiantes
    @Override
    public List<UserEstudiantesGetDTO> findAllEstud() {

        Role studentRole = Role.ESTUDIANTE;
        List<User> users = userRepository.findByRol(studentRole);

        return users.stream()
                .map(e -> new UserEstudiantesGetDTO(
                        e.getDni(),
                        e.getNombre() + " " + e.getApellido(),
                        e.getLocalidad().getId(),
                        e.getLocalidad().getLocalidad(),
                        e.getTelefono(),
                        e.getEmail(),
                        e.getCarrera().getId(),
                        e.getCarrera().getCarrera()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<String> getEmailByDni(String dni) {
        return userRepository.findEmailById(dni);
    }

}


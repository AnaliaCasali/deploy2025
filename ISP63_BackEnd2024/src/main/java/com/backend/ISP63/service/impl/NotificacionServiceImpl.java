package com.backend.ISP63.service.impl;

import com.backend.ISP63.dto.NotificacionDTO;
import com.backend.ISP63.enums.Role;
import com.backend.ISP63.model.Notificacion;
import com.backend.ISP63.model.User;
import com.backend.ISP63.repository.NotificacionRepository;
import com.backend.ISP63.repository.UserRepository;
import com.backend.ISP63.service.EmailService;
import com.backend.ISP63.service.NotificacionService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificacionServiceImpl implements NotificacionService {

    @Autowired
    private NotificacionRepository notificacionRepository;

    @Autowired
    private UserRepository usuarioRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public List<NotificacionDTO> findAll() {
        List<Notificacion> notificaciones = notificacionRepository.findAll();
        return notificaciones.stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    @Override
    public List<NotificacionDTO> obtenerNotificacionesNoLeidas(String usuarioDni) {
        User usuario = usuarioRepository.findById(usuarioDni)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        List<Notificacion> notificaciones = notificacionRepository.findByUsuarioDestinoAndLeidaFalse(usuario);
        return notificaciones.stream().map(this::convertirADTO).collect(Collectors.toList());
    }

    @Override
 //   @Transactional
    public void crearNotificacion(String mensaje, String dni) {
        User usuario = usuarioRepository.findById(dni)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        Notificacion notificacion = new Notificacion();
        notificacion.setMensaje(mensaje);
        notificacion.setUsuarioDestino(usuario);
        notificacion.setLeida(false);
        notificacionRepository.save(notificacion);
        emailService.sendEmail(usuario.getEmail(),"Info IES63", mensaje);
    }

    @Override
    public void crearNotificacionPorRol(String mensaje, List<String> rol) {
        try {
            // Obtén todos los usuarios que tienen los roles especificados
            List<User> usuarios = usuarioRepository.findByRolIn(rol);

            if (usuarios.isEmpty()) {
                throw new IllegalArgumentException("No se encontraron usuarios con los roles especificados");
            }

            // Crea y guarda una notificación para cada usuario
            for (User usuario : usuarios) {
                Notificacion notificacion = new Notificacion();
                notificacion.setMensaje(mensaje);
                notificacion.setUsuarioDestino(usuario);
                notificacion.setLeida(false);
                notificacionRepository.save(notificacion);
                emailService.sendEmail(usuario.getEmail(),"Info IES63", mensaje);
            }
        } catch (Exception e) {
            // Manejo de errores detallado (opcional)
            throw new RuntimeException("Error al enviar notificaciones a roles: " + e.getMessage());
        }

    }

    public void sendEmail(String usuarioId) {

        User usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new IllegalArgumentException("Usuario no encontrado"));
        emailService.sendEmail(usuario.getEmail(),"Info IES63", "texto de notificacion");
    }
  
    @Override
    public void marcarComoLeida(Long id) {
        Notificacion notificacion = notificacionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Notificación no encontrada"));
        notificacion.setLeida(true);
        notificacionRepository.save(notificacion);
    }

    @Override
    public void eliminarNotificacion(Long id) {
        if (notificacionRepository.existsById(id)) {
            notificacionRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("No se encontró la notificación con id " + id);
        }
    }

    // Método auxiliar para convertir Notificacion a NotificacionDTO
    private NotificacionDTO convertirADTO(Notificacion notificacion) {
        NotificacionDTO dto = new NotificacionDTO();
        dto.setId(notificacion.getId());
        dto.setMensaje(notificacion.getMensaje());
        dto.setLeida(notificacion.isLeida());
        dto.setUsuarioDestinoDni(notificacion.getUsuarioDestino().getDni());
        return dto;
    }
    @Override
    public long contarNotificacionesNoLeidas(String usuarioId) {
        return notificacionRepository.countByUsuarioDestino_DniAndLeidaFalse(usuarioId);
    }

}

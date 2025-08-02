package com.backend.ISP63.service;
import com.backend.ISP63.dto.NotificacionDTO;

import java.util.List;

public interface NotificacionService {

    List<NotificacionDTO> findAll();

    List<NotificacionDTO> obtenerNotificacionesNoLeidas(String usuarioDni);

    void crearNotificacion(String mensaje, String dni);
    void crearNotificacionPorRol(String mensaje, List<String> rol);


    void marcarComoLeida(Long id);

    void eliminarNotificacion(Long id);

    public long contarNotificacionesNoLeidas(String usuarioId);

    public void sendEmail(String usuarioId);
}

package com.backend.ISP63.repository;


import com.backend.ISP63.model.Notificacion;
import com.backend.ISP63.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {

    List<Notificacion> findByUsuarioDestinoAndLeidaFalse(User usuarioDestino);
    long countByUsuarioDestino_DniAndLeidaFalse(String dni);

}

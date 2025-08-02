package com.backend.ISP63.controller;

import com.backend.ISP63.dto.NotificacionDTO;
import com.backend.ISP63.dto.NotificacionRolDTO;
import com.backend.ISP63.model.User;
import com.backend.ISP63.service.EmailService;
import com.backend.ISP63.service.NotificacionService;
import org.hibernate.validator.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {

    @Autowired
    private NotificacionService notificacionService;

    @GetMapping
    public ResponseEntity<List<NotificacionDTO>> obtenerTodas() {
        try {
            List<NotificacionDTO> notificaciones = notificacionService.findAll();
            return new ResponseEntity<>(notificaciones, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/no-leidas/{usuarioDni}")
    public ResponseEntity<List<NotificacionDTO>> obtenerNoLeidas(@PathVariable String usuarioDni) {
        try {
            List<NotificacionDTO> notificaciones = notificacionService.obtenerNotificacionesNoLeidas(usuarioDni);
            return new ResponseEntity<>(notificaciones, HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping
    public ResponseEntity<String> crearNotificacion(@RequestBody NotificacionDTO notificacionDTO) {
        try {
            notificacionService.crearNotificacion(notificacionDTO.getMensaje(), notificacionDTO.getUsuarioDestinoDni());
            return new ResponseEntity<>("Notificación creada exitosamente", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la notificación");
        }
    }
    @PutMapping("/leer/{id}")
    public ResponseEntity<String> marcarComoLeida(@PathVariable Long id) {
        try {
            notificacionService.marcarComoLeida(id);
            return new ResponseEntity<>("Notificación marcada como leída", HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al marcar la notificación como leída");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarNotificacion(@PathVariable Long id) {
        try {
            notificacionService.eliminarNotificacion(id);
            return new ResponseEntity<>("Notificación eliminada exitosamente", HttpStatus.ACCEPTED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontró la notificación con id " + id);
        }
    }
    // Endpoint para contar notificaciones no leídas
    @GetMapping("/noleidas/{usuarioId}")
    public ResponseEntity<Long> contarNotificacionesNoLeidas(@PathVariable("usuarioId") String usuarioId) {
        long notificacionesNoLeidas = notificacionService.contarNotificacionesNoLeidas(usuarioId);
        // Devuelve un ResponseEntity con el conteo de notificaciones no leídas y el status 200 OK
        return ResponseEntity.ok(notificacionesNoLeidas);
    }

  //enviar notificacion por ROL
    @PostMapping("/enviar-a-roles")
    public ResponseEntity<String> enviarNotificacionARoles(@RequestBody NotificacionRolDTO notificacionRolDTO) {
        try {
            // Llamar al servicio para enviar la notificación a los usuarios con los roles especificados
            return ResponseEntity.ok("Notificación enviada a roles: " + notificacionRolDTO.getRol());
        } catch (IllegalArgumentException e) {
            // Respuesta personalizada para errores de validación
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        } catch (Exception e) {
            // Respuesta en caso de otros errores
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al enviar notificación: " + e.getMessage());
        }
    }

    // Endpoint para contar notificaciones no leídas
    @GetMapping("/email/{usuarioId}")
    public ResponseEntity<String> enviarMailNotificacion (@PathVariable("usuarioId") String usuarioId) {
        notificacionService.sendEmail(usuarioId);
        // Devuelve un ResponseEntity con el conteo de notificaciones no leídas y el status 200 OK
        return ResponseEntity.ok("ok");
    }
}

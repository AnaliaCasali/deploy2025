import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionService } from '../../../services/notificacion.service';
import { AuthService } from './../../../../core/services/auth.service';
import { ChangeDetectorRef } from '@angular/core'; // Importa el ChangeDetectorRef

@Component({
  selector: 'app-notificaciones-listado',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notificaciones-listado.component.html',
  styleUrls: ['./notificaciones-listado.component.css'],

})
export class NotificacionesListadoComponent implements OnInit {
  notificaciones: any[] = [];
  dni: string = '';

  constructor(
    private notificacionService: NotificacionService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.dni = String(localStorage.getItem('dni'));
      this.cargarNotificacionesNoLeidas();
        }
  }

  cargarNotificacionesNoLeidas(): void {
    this.notificacionService.obtenerNoLeidas(this.dni).subscribe(
      (data) => {
        this.notificaciones = data;
        console.log(this.notificaciones); // Verifica aquí
      },
      (error) => {
        console.error('Error al cargar las notificaciones', error);
      }
    );
  }

  marcarComoLeida(id: number): void {
    this.notificacionService.marcarComoLeida(id).subscribe(
      () => {
        // Recargar la lista después de marcar la notificación como leída
        const notificacion = this.notificaciones.find(n => n.id === id);
        if (notificacion) {
          notificacion.leida = true;
          // Si quieres eliminar la notificación:
          // this.notificaciones = this.notificaciones.filter(n => n.id !== id);
        }

        //this.cargarNotificacionesNoLeidas();

      },
      (error) => {
        console.error('Error al marcar la notificación como leída', error);
      }
    );
  }

  eliminarNotificacion(id: number): void {
    this.notificacionService.eliminarNotificacion(id).subscribe(
      () => {
        // Recargar después de eliminar
        this.cargarNotificacionesNoLeidas();
      },
      (error) => {
        console.error('Error al eliminar la notificación', error);
      }
    );
  }
}

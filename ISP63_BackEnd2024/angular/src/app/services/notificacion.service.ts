import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionRolDTO } from '../modelo/notificaciones/NotificacionRolDTO';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  private apiUrl = environment.apiUrl + 'api/notificaciones';


  constructor(private http: HttpClient,
    private authService: AuthService,
  ) { }

  // Método para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Obtener todas las notificaciones
  obtenerTodas(): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener notificaciones no leídas para un usuario
  obtenerNoLeidas(usuarioDestinoDni: string): Observable<any[]> {
    const headers = this.getHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/no-leidas/${usuarioDestinoDni}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Crear una nueva notificación
  crearNotificacion(mensaje: string, dni: string): Observable<string> {
    const headers = this.getHeaders();

    const unaNotificacion = {
      mensaje: mensaje,
      usuarioDestinoDni: dni
    };
//se agrega responseType: 'text' al headhers porque devuelve un string en controller
    return this.http.post(this.apiUrl, unaNotificacion, { headers, responseType: 'text' }).pipe(
      catchError((error) => {
        console.error('Error al crear la notificación', error);
        return throwError(error); // Manejo de errores
      })
    );
  }
  
  enviarNotificacionARoles(mensaje: string, rol: string[]): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const notificacionRolDTO = { mensaje, rol: [] }; // Asegúrate de que la propiedad sea 'rol' y sea una lista

    return this.http
      .post<string>(`${this.apiUrl}/enviar-a-roles`, notificacionRolDTO, { headers })
      .pipe(
        catchError((error) => {
          let errorMessage = 'Error al enviar notificación';
          if (error.status === 400) {
            errorMessage = `Error de validación: ${error.error}`;
          } else if (error.status === 500) {
            errorMessage = `Error en el servidor: ${error.error}`;
          }
          return throwError(() => new Error(errorMessage));
        })
      );
  }

  // Marcar una notificación como leída
  marcarComoLeida(id: number): Observable<string> {
    const headers = this.getHeaders();
    console.log(`${this.apiUrl}/leer/${id}`);
    return this.http.put<string>(`${this.apiUrl}/leer/${id}`, { headers, responseType: 'text'  }).pipe();
  }

  // Eliminar una notificación
  eliminarNotificacion(id: number): Observable<string> {
    const headers = this.getHeaders();
    console.log(`${this.apiUrl}/leer/${id}`);
    return this.http.delete<string>(`${this.apiUrl}/${id}`, { headers  }).pipe();
  }

  contarNotificacionesNoLeidas(usuarioId: string): Observable<number> {
    const headers = this.getHeaders();
    return this.http.get<number>(`${this.apiUrl}/noleidas/${usuarioId}`, { headers  });
  }
  private handleError(error: any) {
    console.error('Ocurrió un error', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Ocurrió un problema. Inténtalo de nuevo.',
      confirmButtonText: 'OK',
    });
    return throwError(error.message || 'Server Error');
  }
}

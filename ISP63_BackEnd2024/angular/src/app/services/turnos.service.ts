import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { TurnoDTO } from '../modelo/turnos/TurnoDTO';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { NotificacionService } from './notificacion.service';
import { TurnoHabilitadoDTO } from '../modelo/turnos/TurnoHabilitadoDTO';



@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private notificacionService: NotificacionService
  ) { }
  dni: string = '';

  private url = environment.apiUrl + 'api/turnos'

  // Método para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      this.dni = String(localStorage.getItem('dni'));
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  public obtenerDatos(): Observable<TurnoDTO[]> {
    const headers = this.getHeaders();
    return this.http.get<TurnoDTO[]>(`${this.url}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Metodo para obtener la lista de turnos
  findAll(): Observable<TurnoDTO[]> {
    const headers = this.getHeaders();
    return this.http.get<TurnoDTO[]>(this.url,{headers})
      .pipe(
        catchError(this.handleError) // Manejo de errores
      );
  }
  // Metodo para obtener un turno por Id
  findById(id: number): Observable<TurnoDTO> {
    const headers = this.getHeaders();
    return this.http.get<TurnoDTO>(`${this.url}/${id}`, { headers })
      .pipe(
      catchError(this.handleError)
    );
  }

  // Método para guardar el TurnoDTO
  saveTurno(turnoDTO: TurnoDTO): Observable<TurnoDTO> {
    const headers = this.getHeaders();
    return this.http.post<TurnoDTO>(`${this.url}`, turnoDTO, { headers }).pipe(
      tap((response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'El turno se registro exitosamente.',
          confirmButtonText: 'OK'
        });
        // Definir los roles a los que se enviará la notificación
        const rol = ['ESTUDIANTE', 'DOCENTE']; // Cambia estos roles según sea necesario

        // Crear notificación por rol después de crear el turno
        this.notificacionService.enviarNotificacionARoles('Turno creado', rol).subscribe({
          next: () => console.log('Notificación enviada a roles exitosamente.'),
          error: (error) => console.error('Error al enviar la notificación a roles:', error),
        });
      }),
      catchError((error) => {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar el Turno. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error al registrar el Turno', error);
        return throwError(error); // Propagar el error para que otros puedan manejarlo

      })
    );
  }
  // Método para editar un turno
  editarTurno(id: number, turnoDTO: TurnoDTO): Observable<TurnoDTO> {
    const headers = this.getHeaders();
    return this.http.put<TurnoDTO>(`${this.url}/${id}`, turnoDTO, { headers }).pipe(
      tap((response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'El turno se pudo editar correctamente.',
          confirmButtonText: 'OK'
        });
        this.notificacionService.crearNotificacion('Turno actualizado', this.dni).subscribe(); // Crear notificación

      }),
      catchError((error) => {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al editar el Turno. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error al editar el turno:', error);
        return throwError(error);
      })
    );
  }

  // Método para eliminar un turno
  deleteTurno(id: number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.delete<string>(`${this.url}/${id}`, { headers }).pipe(
      tap((response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'El turno se elimino correctamente.',
          confirmButtonText: 'OK'
        });
      }),
      catchError((error) => {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar el Turno. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error al eliminar el turno:', error);
        return throwError(error);
      })
    );
  }

    // Método para obtener los turnos habilitados
    public obtenerTurnoHabilitado(): Observable<TurnoHabilitadoDTO> {
      const headers = this.getHeaders();
      return this.http.get<TurnoHabilitadoDTO>(`${this.url}/habilitado`, { headers }).pipe(
        catchError(this.handleError)
      );
    }
    

  // Manejo de errores
  private handleError(error: any) {
    console.error('A ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }
}

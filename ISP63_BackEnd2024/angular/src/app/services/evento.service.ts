import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
 import { NotificacionService } from './notificacion.service';
import { AuthService } from '../../core/services/auth.service';
import { environment } from '../../environments/environment';
import { Evento } from '../modelo/Evento';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class EventoService {



  private apiUrl =  environment.apiUrl + 'api/eventos';
  private authUrl =  environment.apiUrl + 'auth/eventos';

  constructor(private http: HttpClient,
       private authService: AuthService,  private notificacionService: NotificacionService ) {}
   dni: string='';

  // Método para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();

    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      this.dni = String( localStorage.getItem('dni'));
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  public ObtenerDatos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.authUrl}`).pipe(
      catchError(error => {
        //console.error('Error fetching evento:', error);
        return of([]);  // Devuelve un array vacío o un valor por defecto
      })

    );

  }

    getEventos(): Observable<Evento[]> {
      return this.http.get<Evento[]>(this.authUrl).pipe(
        catchError(error => {
          //console.error('Error fetching evento:', error);
          return of([]);  // Devuelve un array vacío o un valor por defecto
        })

      );
    }

    getEventosConFiles(): Observable<Evento[]> {

      return this.http.get<Evento[]>(`${this.authUrl}/confiles`).pipe(
        catchError(error => {
          //console.error('Error fetching evento:', error);
          return of([]);  // Devuelve un array vacío o un valor por defecto
        })

      );
    }

    getEvento(id: number): Observable<Evento> {
      return this.http.get<Evento>(`${this.authUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    createEvento(evento: Evento): Observable<Evento> {
      const headers = this.getHeaders();
      return this.http.post<Evento>(this.apiUrl, evento, { headers }).pipe(
        tap((response) => {
          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Genial!',
            text: 'El evento se creo exitosamente.',
            confirmButtonText: 'OK'
          });

          if (this.dni) {
            this.notificacionService.crearNotificacion('Evento creado', this.dni).subscribe(
              () => console.log('Notificación creada correctamente'),
              (error) => console.error('Error al crear la notificación', error)
            );
          } else {
            console.error('DNI no está definido');
          }

        }),
        catchError((error) => {
          // Mostrar mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema guardar. Inténtalo nuevamente.',
            confirmButtonText: 'OK'
          }

        );
        console.error('Error al subir evento',error);

          return throwError (error); // Propagar el error para que otros puedan manejarlo
        })
      );
    }


    updateEvento(id: number, evento: Evento): Observable<Evento> {
      const headers = this.getHeaders();
      return this.http.put<Evento>(`${this.apiUrl}/${id}`, evento, { headers }).pipe(
        tap((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa!',
            text: 'El evento fue actualizado correctamente.',
            confirmButtonText: 'OK'
          });
          this.notificacionService.crearNotificacion('Evento actualizado', this.dni).subscribe(); // Crear notificación

        }),
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en la actualización',
            text: 'Hubo un problema al actualizar la evento. Inténtalo nuevamente.',
            confirmButtonText: 'OK'
          });
          return throwError (error);
        })
      );
    }

    deleteEvento(id: number): Observable<void> {
      const headers = this.getHeaders();
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
        tap(() => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminación exitosa!',
            text: 'La evento fue eliminado correctamente.',
            confirmButtonText: 'OK'
          });
          this.notificacionService.crearNotificacion('Evento eliminado', this.dni).subscribe(); // Crear notificación
            }),
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en la eliminación',
            text: `Hubo un problema al eliminar la evento con id ${id}. Inténtalo nuevamente.`,
            confirmButtonText: 'OK'
          });
          return throwError(error);
        })
      );
    }

    private handleError(error: any) {
      const headers = this.getHeaders();
      console.warn('A ocurrido un error', error);
      return throwError(error.message || 'Server Error');
    }

  }



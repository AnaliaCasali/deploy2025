import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Carrera } from '../modelo/carreras/carrera';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { NotificacionService } from './notificacion.service';

@Injectable({
  providedIn: 'root'
})
export class InfoCarrerasService {

  private apiUrl =  environment.apiUrl + 'api/carreras';
  private authUrl =  environment.apiUrl + 'auth/carreras'; //auth

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

  public ObtenerDatos(): Observable<Carrera[]>{
    return this.http.get<Carrera[]>(`${this.authUrl}`).pipe(
/*      catchError(error => {
        console.error('Error fetching carreras:', error);
        return of([]);  // Devuelve un array vacío o un valor por defecto
      })*/
    );

  }



    getCarreras(): Observable<Carrera[]> {
      return this.http.get<Carrera[]>(this.authUrl).pipe(
        catchError(error => {
//          console.error('Error fetching carreras:', error);
          return of([]);  // Devuelve un array vacío o un valor por defecto
        })
      );
    }

    getCarrerasConFiles(): Observable<Carrera[]> {
      return this.http.get<Carrera[]>(`${this.authUrl}/confiles`).pipe(
        /*catchError(error => {
      console.error('Error fetching carreras:', error);
      return of([]);  // Devuelve un array vacío o un valor por defecto
        })*/
      );
    }

    getCarrera(id: number): Observable<Carrera> {
      return this.http.get<Carrera>(`${this.authUrl}/${id}`).pipe(
        catchError(this.handleError)
      );
    }

    createCarrera(carrera: Carrera): Observable<Carrera> {
      const headers = this.getHeaders();
      return this.http.post<Carrera>(this.apiUrl, carrera, { headers }).pipe(
        tap((response) => {
          // Mostrar mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: 'Genial!',
            text: 'La carrera se registro exitosamente.',
            confirmButtonText: 'OK'
          });

          if (this.dni) {
            this.notificacionService.crearNotificacion('Carrera creada', this.dni).subscribe(
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
        console.error('Error al subircarrera',error);

          return throwError(error); // Propagar el error para que otros puedan manejarlo
        })
      );
    }


    updateCarrera(id: number, carrera: Carrera): Observable<Carrera> {
      const headers = this.getHeaders();
      return this.http.put<Carrera>(`${this.apiUrl}/${id}`, carrera, { headers }).pipe(
        tap((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Actualización exitosa!',
            text: 'La carrera fue actualizada correctamente.',
            confirmButtonText: 'OK'
          });
          this.notificacionService.crearNotificacion('Carrera actualizada', this.dni).subscribe(); // Crear notificación

        }),
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en la actualización',
            text: 'Hubo un problema al actualizar la carrera. Inténtalo nuevamente.',
            confirmButtonText: 'OK'
          });
          return throwError(error);
        })
      );
    }

    deleteCarrera(id: number): Observable<void> {
      const headers = this.getHeaders();
      return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
        tap(() => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminación exitosa!',
            text: 'La carrera fue eliminada correctamente.',
            confirmButtonText: 'OK'
          });
          this.notificacionService.crearNotificacion('Carrera eliminada', this.dni).subscribe(); // Crear notificación
            }),
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error en la eliminación',
            text: `Hubo un problema al eliminar la carrera con id ${id}. Inténtalo nuevamente.`,
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



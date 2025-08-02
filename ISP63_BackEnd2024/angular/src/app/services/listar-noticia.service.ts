import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { Noticia } from '../modelo/Noticia';
import { NotificacionService } from './notificacion.service';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ListarNoticiasService {

  private apiUrl =  environment.apiUrl + 'api/noticias';
  private authUrl =  environment.apiUrl + 'auth/noticias'; //auth

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


public ObtenerDatos(): Observable<Noticia[]>{
  return this.http.get<Noticia[]>(`${this.authUrl}`).pipe(
    catchError(error => {
      //console.error('Error fetching noticias:', error);
      return of([]);  // Devuelve un array vacío o un valor por defecto
    })

  );

}


  getNoticias(): Observable<Noticia[]> {
    return this.http.get<Noticia[]>(this.authUrl).pipe(
      catchError(error => {
        //console.error('Error fetching noticias:', error);
        return of([]);  // Devuelve un array vacío o un valor por defecto
      })

    );
  }


  getNoticia(id: number): Observable<Noticia> {
    //const headers = this.getHeaders();
    return this.http.get<Noticia>(`${this.authUrl}/${id}`).pipe(
      //catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('Ha ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }

  createNoticia(noticia: Noticia): Observable<Noticia> {
    const headers = this.getHeaders();
    return this.http.post<Noticia>(this.apiUrl, noticia, { headers }).pipe(
      tap((response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'La noticia se registro exitosamente.',
          confirmButtonText: 'OK'
        });

        if (this.dni) {
          this.notificacionService.crearNotificacion('Noticia creada', this.dni).subscribe(
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
      console.error('Error al subir noticia',error);

        return throwError(error); // Propagar el error para que otros puedan manejarlo
      })
    );
  }


  updateNoticia(id: number, noticia: Noticia): Observable<Noticia> {
    const headers = this.getHeaders();
    return this.http.put<Noticia>(`${this.apiUrl}/${id}`, noticia, { headers }).pipe(
      tap((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa!',
          text: 'La noticia fue actualizada correctamente.',
          confirmButtonText: 'OK'
        });
        this.notificacionService.crearNotificacion('Noticia actualizada', this.dni).subscribe(); // Crear notificación

      }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la actualización',
          text: 'Hubo un problema al actualizar la noticia. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        return throwError(error);
      })
    );
  }

  deleteNoticia(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      tap(() => {
        Swal.fire({
          icon: 'success',
          title: 'Eliminación exitosa!',
          text: 'La noticia fue eliminada correctamente.',
          confirmButtonText: 'OK'
        });
        this.notificacionService.crearNotificacion('Noticia eliminada', this.dni).subscribe(); // Crear notificación
          }),
      catchError((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error en la eliminación',
          text: `Hubo un problema al eliminar la noticia con id ${id}. Inténtalo nuevamente.`,
          confirmButtonText: 'OK'
        });
        return throwError(error);
      })
    );
  }


}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MesaExamenPostDTO } from '../modelo/mesaExamen/mesaExamenPostDTO';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
import { catchError, tap } from 'rxjs/operators';
import { MesaExamenGetDTO } from '../modelo/mesaExamen/mesaExamenGetDTO';


@Injectable({
  providedIn: 'root'
})
export class MesaExamenServiceService {

  private url = environment.apiUrl + 'api/mesas-examen'

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Método para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Metodo para obtener mesa de examen por turno
  findByTurno(id: number): Observable<MesaExamenPostDTO> {
    const headers = this.getHeaders();

    return this.http.get<MesaExamenPostDTO>(`${this.url}/turno/${id}`, { headers })
    .pipe(
      catchError(this.handleError)
    )
  }

  saveMesaExamen(mesaExamen: MesaExamenPostDTO): Observable<MesaExamenPostDTO> {
    const headers = this.getHeaders();
    return this.http.post<MesaExamenPostDTO>(this.url, mesaExamen, { headers }).pipe(
      tap((response) => {
       // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'La Mesa de Examen se registro exitosamente.',
          confirmButtonText: 'OK'
        });
      }),
      catchError((error) => {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al guardar la Mesa de Examen. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error al subir la Mesa de Examen', error);
        return throwError(error); // Propagar el error para que otros puedan manejarlo

      })
    );
  }
  // Método para actualizar una mesa de examen
  actualizarMesaExamen(id: number, mesaExamenPostDTO: MesaExamenPostDTO): Observable<MesaExamenPostDTO> {
    const headers = this.getHeaders();

    return this.http.put<MesaExamenPostDTO>(`${this.url}/${id}`, mesaExamenPostDTO, { headers }).pipe(
      tap((response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'La Mesa de Examen se actualizo exitosamente.',
          confirmButtonText: 'OK'
        });
      }),
      catchError((error) => {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al actualizar la Mesa de Examen. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error al actualizar la mesa de examen:', error);
        return throwError(error);
      })
    );
  }

  // Método para eliminar una mesa de examen
  deleteMesaExamen(id: number): Observable<string> {
    const headers = this.getHeaders();
    return this.http.delete<string>(`${this.url}/${id}`, { headers }).pipe(
      tap((response) => {
        // Mostrar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Genial!',
          text: 'La Mesa de Examen se elimino exitosamente.',
          confirmButtonText: 'OK'
        });
      }),
      catchError((error) => {
        // Mostrar mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un problema al eliminar la Mesa de Examen. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error al eliminar la mesa de examen:', error);
        return throwError(error);
      })
    );
  }
  // Manejo de errores
  private handleError(error: any) {
    console.error('A ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }
}

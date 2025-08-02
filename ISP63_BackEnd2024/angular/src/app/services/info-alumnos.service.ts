import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../../core/services/auth.service';
import { alumno } from '../modelo/alumnos/alumno';
import { alumnos } from '../modelo/alumnos/alumnos';
import { todosAlumnos } from '../modelo/todosAlumnos/todosAlumnos';
import { localidades } from '../modelo/Localidades/localidades';

@Injectable({
  providedIn: 'root'
})
export class InfoAlumnosService {

  private apiUrl =  environment.apiUrl + 'api/inscripcionmesasexamen/lista-inscriptos';
  private apiUrlUser = environment.apiUrl + 'api/usuario/';
  private apiUrlLoc = environment.apiUrl + 'auth/localidades'
  constructor(private http: HttpClient, private authService: AuthService) {}

    // Método para obtener los headers con el token
    private getHeaders(): HttpHeaders {
      let headers = new HttpHeaders();
      if (this.authService.isAuthenticated()) {
        const token = localStorage.getItem('authToken');
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }

    public ObtenerDatos(): Observable<alumno[]> {
      return this.http.get<alumno[]>(this.apiUrl, { headers: this.getHeaders() }).pipe(
        catchError(this.handleError)  // Manejo de errores
      );
    }
  

    public obtenerLocalidades(): Observable<localidades[]>{
      return this.http.get<localidades[]>(this.apiUrlLoc).pipe(catchError(this.handleError));
    }




  public obtenerTodosAlumnos():Observable<todosAlumnos[]>{
    const headers = this.getHeaders();  


    return this.http.get<todosAlumnos[]>(`${this.apiUrlUser}todosAlumnos`, { headers }).pipe(
      catchError(this.handleError)
    );
  }




   // Manejo de errores
   private handleError(error: any) {
    console.error('A ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }
}

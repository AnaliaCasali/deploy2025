import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDTO } from '../modelo/users/UserDTO';
import { Observable, catchError, throwError } from 'rxjs';

import { environment } from '../../environments/environment'; // Si tienes variables de entorno.
import { User } from '../modelo/user/user';
import { AuthService } from '../../core/services/auth.service';
import { NotificacionService } from './notificacion.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl =  environment.apiUrl + 'api/usuario'
  private url = environment.apiUrl + 'api/usuario'
  private dni:string='';
constructor(private http: HttpClient   , private authService: AuthService,  private notificacionService: NotificacionService ) { }



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

  public obtenerDatos(): Observable<UserDTO[]> {
    const headers = this.getHeaders();
    return this.http.get<UserDTO[]>(`${this.url}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método para obtener usuarios por rol
  getUsersByRol(rol: string): Observable<UserDTO[]> {
    return this.http.get<UserDTO[]>(`${this.url}/rol/${rol}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: any) {
    console.error('A ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    const headers = this.getHeaders();
    return this.http.get<User[]>(`${this.apiUrl}`, { headers });
  }

  // Obtener usuario por DNI
  getUserByDni(dni: string): Observable<User> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/${dni}`;
    return this.http.get<User>(url, { headers });
  }

  ChangePassword(newPassword: string): Observable<User> {
    const headers = this.getHeaders();
    const url = `${this.apiUrl}/cambiarpassword/${this.dni}`; // URL con el dni en la ruta
    const params = new HttpParams().set('newPassword', newPassword); // Agregar newPassword como parámetro de consulta
    console.log(url);
    return this.http.put<User>(url, {}, { headers, params });
  }

}

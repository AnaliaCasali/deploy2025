import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { Materias } from '../modelo/materias/materias';
import { AuthService } from '../../core/services/auth.service';




@Injectable({
  providedIn: 'root'
})
export class InfoMateriasService {
  constructor(private http: HttpClient, private authService: AuthService) {}

    private url =  environment.apiUrl + 'api/asignatura'

  // Método para obtener los headers con el token
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (this.authService.isAuthenticated()) {
      const token = localStorage.getItem('authToken');
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

// Materias por carrera y año (filtros)
public obtenerAsigAnioCarrera(carreraId: number, anio: number): Observable<Materias[]> {
  const headers = this.getHeaders();
  return this.http.get<Materias[]>(`${this.url}/por-carrera/${carreraId}/anio/${anio}`, { headers }).pipe(
      catchError(this.handleError)
  );
}


  public obtenerDatos(): Observable<Materias[]> {
    const headers = this.getHeaders();
    return this.http.get<Materias[]>(`${this.url}/datosminimos`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener todas las materias
  public obtenerTodas(): Observable<Materias[]> {
    const headers = this.getHeaders();
    return this.http.get<Materias[]>((this.url),{headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una materia por id
  public obtenerPorId(id: number): Observable<Materias> {
    const headers = this.getHeaders();
    return this.http.get<Materias>(`${this.url}/${id}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener materias por id de carrera
  public obtenerPorIdCarrera(idCarrera: number): Observable<Materias[]> {
    const headers = this.getHeaders();
    return this.http.get<Materias[]>(`${this.url}/${idCarrera}`, {headers}).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener materias por id de carrera con otro endpoint
  public obtenerPorIdCarreraAlternativo(idCarrera: number): Observable<Materias[]> {
    const headers = this.getHeaders();
    return this.http.get<Materias[]>(`${this.url}/carrera/${idCarrera}`,{headers}).pipe(
      catchError(this.handleError)
    );
  }

  //get que funcionan
  //Metodo get para obtener todas las asignaturas
  findAll(): Observable<Materias[]> {
    const headers = this.getHeaders();
    return this.http.get<Materias[]>(`${this.url}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  //Metodo get para obtener asinaturas por id de Carrera
  findByCarreraId(carreraId: number): Observable<Materias[]> {
    const headers = this.getHeaders();
    return this.http.get<Materias[]>(`${this.url}/carrera/${carreraId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  //Metodo get para obtener asignatura por id
  findById(id: number): Observable<Materias> {
    const headers = this.getHeaders();
    return this.http.get<Materias>(`${this.url}/${id}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  // Crear una nueva materia
  public crear(materia: Materias): Observable<Materias> {
    const headers = this.getHeaders();
    return this.http.post<Materias>(this.url, materia).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar una materia existente
  public actualizar(id: number, materia: Materias): Observable<Materias> {
    const headers = this.getHeaders();
    return this.http.put<Materias>(`${this.url}/${id}`, materia).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una materia
  public eliminar(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


 // Manejo de errores
 private handleError(error: any) {
  console.error('A ocurrido un error', error);
  return throwError(error.message || 'Server Error');
}

}

import { AuthService } from './../../core/services/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Imagen } from '../modelo/imagen';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private apiUrl = environment.apiUrl + 'api/imagenes';
  private authUrl = environment.apiUrl + 'auth/imagenes';

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

  // Obtener todas las imágenes
  getAllImagenes(): Observable<Imagen[]> {
    const headers = this.getHeaders();
    return this.http.get<Imagen[]>(this.apiUrl, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getAllImagenesAuth(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.authUrl).pipe(
      catchError(this.handleError)
    );
  }
  // Obtener una imagen por ID
  getImagenById(id: number): Observable<Imagen> {
    const headers = this.getHeaders();
    return this.http.get<Imagen>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getImagenByIdAuth(id: number): Observable<Imagen> {
    return this.http.get<Imagen>(`${this.authUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getImage(imagePath: string) {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/images/${imagePath}`, { headers, responseType: 'blob' });

  }

  getImageAuth(imagePath: string) {

    return this.http.get(`${this.authUrl}/images/${imagePath}`, { responseType: 'blob' });

  }

  // Subir una imagen
  uploadImagen(file: File, alt: string): Observable<Imagen> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alt', alt);

    const headers = this.getHeaders();

    // Enviar la solicitud HTTP con los headers que contienen el token
    return this.http.post<Imagen>(`${this.apiUrl}/upload/${alt}`, formData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener el archivo de imagen por ID
  getImagenFile(id: number): Observable<Blob> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/archivo/${id}`, { headers, responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }
  // Obtener el archivo de imagen por ID
  getImagenFileAuth(id: number): Observable<Blob> {
    //console.log("en getImagenFileAuth  en service: " +  `${this.authUrl}/archivo/${id}`);
    return this.http.get(`${this.authUrl}/archivo/${id}`, {  responseType: 'blob' }).pipe(
      catchError(this.handleError)
    );
  }

  // Obtener una imagen en formato Blob por ID
  getImagen(id: number): Observable<Blob> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/archivoResource/${id}`, { headers, responseType: 'blob' });
  }

  getImagenAuth(id: number): Observable<Blob> {
    return this.http.get(`${this.authUrl}/archivoResource/${id}`, { responseType: 'blob' });
  }

  // Manejo de errores
  private handleError(error: any) {
    //console.error('A ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }
}

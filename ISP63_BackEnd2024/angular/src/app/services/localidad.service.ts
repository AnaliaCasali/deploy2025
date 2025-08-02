import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Localidad } from '../modelo/localidad';

@Injectable({
  providedIn: 'root',
})
export class LocalidadService {
  private apiUrl = environment.apiUrl + 'auth/localidades'; // Cambia la URL según sea necesario


  constructor(private http: HttpClient) {
//    console.log(this.apiUrl );
  }
  findAll(): Observable<Localidad[]> {
    return this.http.get<Localidad[]>(this.apiUrl).pipe(
      catchError(error => {
        //console.error('Error fetching noticias:', error);
        return of([]);  // Devuelve un array vacío o un valor por defecto
      })

    );
  }

}

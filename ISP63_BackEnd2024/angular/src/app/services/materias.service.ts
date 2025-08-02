import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {

  constructor(private http: HttpClient) { }

    private url = environment.apiUrl + 'api/asignatura/datosminimos'

//  private url = '/public/assets/data/materias.json';
  public obtenerDatos(): Observable<any[]> {
    //return this.http.get<any[]>('../assets/data/Materias.json')
    return this.http.get<any[]>(this.url);

  }


}

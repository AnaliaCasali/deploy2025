import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Routes } from '@angular/router';
import { generarJsonPorRoles } from '../services/RutasPorRol'; // Importas la función
import { routes } from '../../app/app.routes'; // Importas el archivo de rutas

interface RutasPorRol {
  [rol: string]: {
    [incluirEn: string]: { textoLink: string, ruta: string }[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class RutasRolService {

  constructor() { }

  // Método para generar el JSON dinámicamente
  getRutasPorRol(): Observable<RutasPorRol> {
    const rutasPorRol = generarJsonPorRoles(routes); // Llamada a la función que genera el JSON
    return of(rutasPorRol); // Envuelve el resultado en un Observable
  }

  getRutasPorRolEspecifico(rol: string): Observable<{ [incluirEn: string]: { textoLink: string, ruta: string }[] }> {
    const rutasPorRol = generarJsonPorRoles(routes); // Genera todas las rutas
    const rutasParaRol = rutasPorRol[rol] || {}; // Filtra solo el rol específico, si no existe devuelve un objeto vacío
    return of(rutasParaRol); // Envuelve el resultado en un Observable
  }

  // Método para obtener textos y links de un rol y menú específico
  getTextosYLinks(rol: string, incluirEn: string): Observable<{ textoLink: string, ruta: string }[]> {
    return this.getRutasPorRol().pipe(
      map(rutasPorRol => {
        const rutas = rutasPorRol[rol]?.[incluirEn] || [];
        return rutas.map(ruta => ({
          textoLink: ruta.textoLink,
          ruta: ruta.ruta
        }));
      })
    );
  }
}

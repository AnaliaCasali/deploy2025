import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { inscripcion } from '../modelo/llamados/inscripcion';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { alumno } from '../modelo/alumnos/alumno';
import { NotificacionService } from './notificacion.service';
import { Notas } from '../modelo/notasGet/notas';



@Injectable({
  providedIn: 'root'
})
export class InfoLlamadosService {
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private notificacionService: NotificacionService
  ) {}

  private apiUrlInsc= environment.apiUrl + 'api/inscripcionmesasexamen';
  private apiUrlItems= environment.apiUrl + 'api/itemsinscripcionmesas';
  private apiUrl = environment.apiUrl + 'api/mesas-examen';

  public ObtenerListaInscriptos(): Observable<alumno[]> {
    // lista de inscriptos

    const urlConDni = `${this.apiUrlInsc}/lista-inscriptos`;

    const headers = this.getHeaders();
    return this.http.get<alumno[]>(urlConDni, { headers }).pipe(
      catchError(this.handleError)
    );
  }


// MUESTRA MESAS EXAMEN POR USUARIO
  public ObtenerDatos(): Observable<any[]> {
    let dniUsuario = '';

    if (isPlatformBrowser(this.platformId)) {
      dniUsuario = localStorage.getItem('dni') || '';
    } else {
      //console.warn('localStorage no está disponible en este entorno');
    }

    const urlConDni = `${this.apiUrl}/disponibles/${dniUsuario}`;

    const headers = this.getHeaders();
    return this.http.get<any[]>(urlConDni, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // AUTORIZACION
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();


    if (isPlatformBrowser(this.platformId)) {
      if (this.authService.isAuthenticated()) {
        const token = localStorage.getItem('authToken');
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        } else {
          console.warn('No se encontró el token en localStorage');
        }
      } else {
        console.warn('Usuario no autenticado');
      }
    } else {
      console.warn('No se puede acceder a localStorage en este entorno');
    }

    return headers;
  }

  // GUARDA INCRIPCION
  saveInscripcion(mesasExamenIds: number[], estado: string): Observable<any> {
    let dniUsuario = '';


    if (isPlatformBrowser(this.platformId)) {
      dniUsuario = localStorage.getItem('dni') || '';
    }

    const body = {
      dniUsuario: dniUsuario,
      mesasExamenIds: mesasExamenIds,
      estado: estado
    };

    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrlInsc}/guardar`, body, { headers }).pipe(
      tap(() => {
              if (dniUsuario) {
          this.notificacionService.crearNotificacion('Inscripción registrada', dniUsuario).subscribe(
            () => console.log('Notificación creada correctamente'),
            (error) => console.error('Error al crear la notificación', error)
          );
        } else {
          console.error('DNI no está definido');
        }
      }), catchError(this.handleError)
    );
  }



  public updateEstado(aceptados: { idInsc: number, dni: string, materia: string, turnoLlamado: string }[], rechazados: { idInsc: number, dni: string, materia: string, turnoLlamado: string }[]): Observable<void> {
    const headers = this.getHeaders();
    const body = {
      aceptados: aceptados.map(alumno => alumno.idInsc),
      rechazados: rechazados.map(alumno => alumno.idInsc)
    };

    return this.http.post<void>(`${this.apiUrlItems}/cambiarEstado`, body, { headers }).pipe(
      tap(() => {
        // Envía notificaciones a los alumnos aceptados
        aceptados.forEach(alumno => {
          const mensaje = `Has sido aceptado en ${alumno.materia} para el ${alumno.turnoLlamado} llamado`;
          this.notificacionService.crearNotificacion(mensaje, alumno.dni).subscribe(
            () => console.log(`Notificación enviada al alumno con DNI ${alumno.dni}`),
            (error) => console.error('Error al enviar notificación', error)
          );
        });

        // Envía notificaciones a los alumnos rechazados
        rechazados.forEach(alumno => {
          const mensaje = `Has sido rechazado en ${alumno.materia} para el ${alumno.turnoLlamado} llamado`;
          this.notificacionService.crearNotificacion(mensaje, alumno.dni).subscribe(
            () => console.log(`Notificación enviada al alumno con DNI ${alumno.dni}`),
            (error) => console.error('Error al enviar notificación', error)
          );
        });
      }),
      catchError(this.handleError)
    );
  }


  //CARGAR NOTAS DE MESA EXAMEN

  public updateNota(alumnosConNota: { idInsc: number, nota: number, dni: string, materia: string, llamado: string }[]): Observable<void> {
    const headers = this.getHeaders();

    const body = alumnosConNota.map(alumno => ({
      id: alumno.idInsc,
      nota: alumno.nota
    }));

    return this.http.post<void>(`${this.apiUrlItems}/asignarNota`, body, { headers }).pipe(
      tap(() => {

        alumnosConNota.forEach(alumno => {
          const mensaje = `Se ha registrado una nota de ${alumno.nota} en ${alumno.materia}, llamado: ${alumno.llamado}`;
          this.notificacionService.crearNotificacion(mensaje, alumno.dni).subscribe(
            () => console.log(`Notificación enviada al alumno con DNI ${alumno.dni}`),
            (error) => console.error('Error al enviar notificación', error)
          );
        });
      }),
      catchError(this.handleError)
    );
  }

  // MOSTRAR NOTAS

  public ObtenerNotas(): Observable<Notas[]> {
    let dniUsuario = '';

    if (isPlatformBrowser(this.platformId)) {
      dniUsuario = localStorage.getItem('dni') || '';
    }

    if (!dniUsuario) {
      console.error('DNI no está definido. No se puede obtener la lista de inscriptos.');
      return throwError('DNI no está definido');
    }

    const urlConDni = `${this.apiUrlItems}/notasMesasExamen/${dniUsuario}`;

    const headers = this.getHeaders();
    return this.http.get<Notas[]>(urlConDni, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  //inscriptos APROBADOS
  public ObtenerListaInscriptosAceptados(): Observable<alumno[]> {
    const headers = this.getHeaders();
     return this.http.get<alumno[]>(`${this.apiUrlInsc}/lista-inscriptos-aceptados`, { headers }).pipe(
       catchError(this.handleError)
     );
   }


   // envia los datos a imprimir acta (componente inscriptos aprobados a imprimir acta)

  private inscriptosSource = new BehaviorSubject
  <{ inscriptos: alumno[], carrera: number | null, materia: string | null }>
  ({ inscriptos: [], carrera: null, materia: null });

  currentInscriptos = this.inscriptosSource.asObservable();


  updateInscriptos(datos: { inscriptos: alumno[], carrera: number | null, materia: string | null }) {
    this.inscriptosSource.next(datos);
  }

// imprimir inscriptos a mesas de examen
  private listaInscriptosSource = new BehaviorSubject
  <{ inscriptos: alumno[], anio: number | null, llamado: string | null, carrera: number | null, materia: string | null }>
  ({ inscriptos: [], anio: null, llamado: null, carrera: null, materia: null});

  currentListaInscriptos = this.listaInscriptosSource.asObservable();


  updateListaInscriptos(datosInsc: { inscriptos: alumno[], anio: number | null, llamado: string | null, carrera: number | null, materia: string | null }) {
    this.listaInscriptosSource.next(datosInsc);
  }





  private handleError(error: any) {
    console.error('A ocurrido un error', error);
    return throwError(error.message || 'Server Error');
  }

 // lista mesas de examen profesores (muestra solo las que estan en el tribunal)
 public ObtenerDatosMesasProf(): Observable<any[]> {
  let dniUsuario = '';


  if (isPlatformBrowser(this.platformId)) {
    dniUsuario = localStorage.getItem('dni') || '';
  }


  const urlConDni = `${this.apiUrl}/mesasxtribunal/${dniUsuario}`;


  const headers = this.getHeaders();  
  return this.http.get<any[]>(urlConDni, { headers }).pipe(
    catchError(this.handleError)  
  );
}




// MUESTRA MESAS EXAMEN A LAS QUE EL USUARIO ESTÁ INSCRITO
public ObtenerMesasInscritasPorDni(): Observable<any[]> {
let dniUsuario = '';


if (isPlatformBrowser(this.platformId)) {
    dniUsuario = localStorage.getItem('dni') || '';
}


const urlConDni = `${this.apiUrlInsc}/mismesasalumno/${dniUsuario}`;
const headers = this.getHeaders();


return this.http.get<any[]>(urlConDni, { headers }).pipe(
    catchError(this.handleError)
);
}





}

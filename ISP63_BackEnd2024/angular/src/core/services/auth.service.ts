import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Route, Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponseDTO, RegisterRequestDTO } from './auth.models';
import { Localidad } from '../../app/modelo/localidad';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiURL = environment.apiUrl + "auth";
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient,
                 private router:Router,
                 @Inject(PLATFORM_ID) private platformId: Object) { }




  login(username:string, password:string): Observable<any>{
    //debugger;
    return this.httpClient.post<any>(this.apiURL + "/login", {username, password})
      .pipe(  tap(response=>  {
                if (response.token)
                  {this.setToken(response.token)};

              }),
              catchError((error: HttpErrorResponse) => {
                // Si el error es 401, puedes lanzarlo manualmente
                if (error.status === 401) {
                  return throwError(() => new Error('Sin Autorizacion'));
                }
                return throwError(() => error);
              })
            );
  }

   // Método para registrar un nuevo usuario
   register(request: RegisterRequestDTO): Observable<AuthResponseDTO> {
     const u: RegisterRequestDTO=request;
    // Generar console.log para cada atributo
      console.log('Datos del objeto u:', JSON.stringify(u, null, 2));
    return this.httpClient.post<AuthResponseDTO>(this.apiURL + "/register", request)
      .pipe(
        tap(response => {
          if (response.token) {
            this.setToken(response.token); // Si también deseas almacenar el token al registrarse
          }
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error); // Manejo de errores
        })
      );
  }



  private setToken(token:string):void {
    localStorage.setItem(this.tokenKey, token);
    this.setPayloadData();
}

private getToken(): string | null {
  if (isPlatformBrowser(this.platformId)) {
    // si hay un browser p almacenar
      return localStorage.getItem(this.tokenKey);}
  else{
   // console.warn('localStorage no está disponible en este entorno');
    return '';
  }

}

isAuthenticated(): boolean {
  const token =this.getToken();
  if(!token){
    throwError(() => new Error('Sin Autorizacion'));
    return false;
  }


  let estaAutenticado:Boolean= this.tokenExpiro();
  if (!estaAutenticado)
    { this.removerToken();
      return false;
    }
  else
      return true;

  //atob// decodifica la base 64 (metodo de javascript)
  //convierte a string el token y lo separa por el punto para obtener posicion [0] header [1]  payload [3] firma
}


removerToken():void{
  localStorage.removeItem(this.tokenKey);
  localStorage.removeItem("dni");
  localStorage.removeItem("rol");
  localStorage.removeItem("username");
}

logout(): void {
  this.removerToken();
  this.router.navigate(['login']);
}


private setPayloadData():void{

  const token =this.getToken();
  if(token){
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp=payload.exp * 10000 *60 * 1; // multiplico desde milisegundos
  const rol=payload.rol;
  const sub=payload.sub;
  const dni=payload.dni;
  localStorage.setItem("rol", rol);
  localStorage.setItem("dni", dni);
  localStorage.setItem("username", sub);

  console.log("payload:" +payload)
  console.log("rol:" +rol)
  console.log("dni:" +dni)
  console.log("sub:" + sub)
  }
}

setIntervalVerifyAndRemoveToken() {
  setInterval(() => {
    this.VerificarTokenExpiradoyRemover();
  },2 * 60 * 60 * 1000); //2 horas
}



tokenExpiro():boolean {
  const token =this.getToken();
  if(!token){
    throwError(() => new Error('Sin Autorizacion'));
    return false;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp=payload.exp * 10000 *60 *60* 2; // multiplico desde milisegundos
  return Date.now()<exp;

}


VerificarTokenExpiradoyRemover(): void {
  if (this.tokenExpiro())
      this.removerToken();


}

getRole(): string | null {
  return localStorage.getItem('rol');
}

}


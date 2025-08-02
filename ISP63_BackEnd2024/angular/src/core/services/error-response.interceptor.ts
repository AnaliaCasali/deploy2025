import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { catchError, throwError } from "rxjs";
import { Router } from '@angular/router';
import { inject } from "@angular/core";


export const ErrorResponseInterceptor: HttpInterceptorFn = (request, next) => {
  const router = inject(Router);

  // Verifica que estamos en el navegador antes de acceder a localStorage
  if (typeof window !== 'undefined' && localStorage) {
    const token = localStorage.getItem('authToken'); // Asegúrate de que AuthService tenga un método estático o instancia adecuada

    if (token && !isTokenExpired(token)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      // Si no tiene token o expiró, borra localStorage y realiza logout
      logout();
    }
  }

  return next(request).pipe(
    catchError((error) => manejoErrorResponse(error,router)));

  };


function manejoErrorResponse(error: HttpErrorResponse, router:Router) {

//  console.log("mi error:", error);
  // Mensaje si hay un error
  const errorRespuesta = `Error: ${error.status}, Mensaje: ${error.message}`;
  //console.log("mi mensaje error:", errorRespuesta);

  if (error.status === 401) {
    // Token no válido o expirado, realizo logout
    logout();
  }

  if (error.status === 412) { // 412 indica que debe cambiar la contraseña
    router.navigate(['/change-password']);
  }

  return throwError(() => errorRespuesta);
}

function isTokenExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload.exp * 1000; // Convertir a milisegundos
  return Date.now() >= exp; // Retorna true si ha expirado
}

function logout(): void {
  if (typeof window !== 'undefined' && localStorage) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("dni");
    localStorage.removeItem("rol");
    localStorage.removeItem("username");
  }
}


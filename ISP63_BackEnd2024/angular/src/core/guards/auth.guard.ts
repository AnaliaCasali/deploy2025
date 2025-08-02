import { ActivatedRouteSnapshot, CanActivateFn, Route, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

// va a validar si esta autenticado y si no lo esta redirecciona al login
export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const rol = String(localStorage.getItem('rol')); // Método para obtener el rol del usuario autenticado
    const rolesPermitidos = route.data['roles'] as Array<string>;

    // Verifica si el rol del usuario está permitido
    if (rolesPermitidos && rolesPermitidos.includes(rol)) {
      return true;
    } else {
      // Redirigir si no tiene el rol adecuado
      return router.navigate(['/access-denied']);
    }
  } else {
    // Redirigir al login si no está autenticado
    return router.navigate(['/login']);
  }
};

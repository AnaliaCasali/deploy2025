import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Inyecta el AuthService
  const router = inject(Router); // Inyecta el Router

  // Verifica si está autenticado
  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Evita que continúe con la navegación actual
    // Si no está autenticado, redirige al login
    router.navigate(['/login']);
    return false;
  }
};

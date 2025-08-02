import { Routes } from '@angular/router';

export function generarJsonPorRoles(routes: Routes) {
  const rutasPorRol: any = {};

  routes.forEach((route) => {
    if (route.children) {
      route.children.forEach((child) => {
        const roles = child.data?.['roles'] || [];
        const incluirEn = child.data?.['incluirEn'] || 'Desconocido';
        const textoLink = child.data?.['textoLink'] || 'Sin nombre';
        const ruta = child.path || '';

        roles.forEach((rol: string) => {
          if (!rutasPorRol[rol]) {
            rutasPorRol[rol] = {};
          }
          if (!rutasPorRol[rol][incluirEn]) {
            rutasPorRol[rol][incluirEn] = [];
          }
          rutasPorRol[rol][incluirEn].push({ textoLink, ruta });
        });
      });
    }
  });

  return rutasPorRol;
}

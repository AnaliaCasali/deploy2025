import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-carreras-detalle-sidebar',
  standalone: true,
  imports: [RouterLink , RouterOutlet, CommonModule],
  templateUrl: './carreras-detalle-sidebar.component.html',
  styleUrl: './carreras-detalle-sidebar.component.css'
})
export class CarrerasDetalleSidebarComponent {@Input() carrera: string | undefined ;


  getRutaCarrera(): string {
    switch (this.carrera) {
      case 'tecnicatura':
        return 'tecnicatura';
      case 'lengua':
          return 'lengua';
      case 'primaria':
          return 'primaria';
        case 'biologia':
          return 'biologia';
        case 'tsmi':
          return 'tsmi';
      default:
        return '';
          // Ruta por defecto si no es ninguna de las opciones
    }
    console.log(this.carrera);
  }


  // Función que devuelve el nombre de la carrera para mostrar en el enlace
  getNombreCarrera(): string {
    switch(this.carrera) {
      case 'tecnicatura':
        return 'TECNICATURA SUPERIOR EN DESARROLLO DE SOFTWARE';
        break;
        case 'lengua':
          return 'PROFESORADO DE EDUCACIÓN SECUNDARIA EN LENGUA Y LITERATURA';
          break;
        case 'primaria':
          return 'PROFESORADO DE EDUCACIÓN PRIMARIA';
          break;
          case 'biologia':
            return 'PROFESORADO DE EDUCACIÓN SECUNDARIA EN BIOLOGÍA';
            break;
        case 'tsmi':
          return 'TÉCNICO SUPERIOR EN MANTENIMIENTO INDUSTRIAL';
      default:
        return '';  // Texto por defecto si no es ninguna de las opciones
    }
  }


  activeLink = '/admin-dashboard';
  menuVisible = false;




  setActiveLink(link: string) {
    this.activeLink = link;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }
}

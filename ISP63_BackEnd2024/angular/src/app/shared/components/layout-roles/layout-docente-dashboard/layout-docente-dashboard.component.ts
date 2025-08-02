import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { AdminSidebarComponent } from "../../side-roles/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { SeccionCentralComponent } from "../../seccion-central-dashboard/seccion-central.component";
import { MenuSuperiorDashboardComponent } from "../../menu-superior-dashboard/menu-superior-dashboard.component";
import { EstudianteSidebarComponent } from "../../side-roles/estudiante-sidebar/estudiante-sidebar.component";
import { DocenteSidebarComponent } from "../../side-roles/docente-sidebar/docente-sidebar.component";
import { AuthService } from '../../../../../core/services/auth.service';

@Component({
  selector: 'app-layout-docente-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,
    AdminSidebarComponent, RouterOutlet,
    MenuSuperiorDashboardComponent, SeccionCentralComponent, EstudianteSidebarComponent, DocenteSidebarComponent],  templateUrl: './layout-docente-dashboard.component.html',
  styleUrl: './layout-docente-dashboard.component.css'
})
export class LayoutDocenteDashboardComponent {
  rol: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Obtén el usuario y el rol desde localStorage

    if ( this.auth.isAuthenticated() ){
      this.rol =  String(localStorage.getItem('rol'));
    }
  }
}


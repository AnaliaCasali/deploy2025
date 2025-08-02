import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../../header/header.component";
import { FooterComponent } from "../../footer/footer.component";
import { AdminSidebarComponent } from "../../side-roles/admin-sidebar/admin-sidebar.component";
import { RouterOutlet } from '@angular/router';
import { SeccionCentralComponent } from "../../seccion-central-dashboard/seccion-central.component";
import { MenuSuperiorDashboardComponent } from "../../menu-superior-dashboard/menu-superior-dashboard.component";

@Component({
  selector: 'app-layout-admin-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent,
     AdminSidebarComponent, RouterOutlet,
    MenuSuperiorDashboardComponent, SeccionCentralComponent,
  ],
  templateUrl: './layout-admin-dashboard.component.html',
  styleUrl: './layout-admin-dashboard.component.css'
})
export class LayoutAdminDashboardComponent implements OnInit {
  rol: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Obtén el usuario y el rol desde localStorage

    if ( this.auth.isAuthenticated() ){
      this.rol =  String(localStorage.getItem('rol'));
    }
  }
}


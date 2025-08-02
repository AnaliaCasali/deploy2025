import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { NgIf } from '@angular/common';
import { AdminSidebarComponent } from '../side-roles/admin-sidebar/admin-sidebar.component';
import { EstudianteSidebarComponent } from '../side-roles/estudiante-sidebar/estudiante-sidebar.component';
import { DocenteSidebarComponent } from "../side-roles/docente-sidebar/docente-sidebar.component";


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent, FooterComponent, RouterOutlet,
    NgIf, AdminSidebarComponent, EstudianteSidebarComponent, DocenteSidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent   implements OnInit {
  rol: string = '';

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    // Obtén el usuario y el rol desde localStorage

    if ( this.auth.isAuthenticated() ){
      this.rol =  String(localStorage.getItem('rol'));
    }
  }
}

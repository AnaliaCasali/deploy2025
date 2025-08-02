import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-estudiante-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './estudiante-sidebar.component.html',
  styleUrl: './estudiante-sidebar.component.css'
})
export class EstudianteSidebarComponent{
    activeLink = '/estudiante-dashboard';
    menuVisible = false;


    constructor(private authService: AuthService) {
    }
    logout(): void{
      this.authService.logout();  }




    setActiveLink(link: string) {
      this.activeLink = link;
    }

    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    }
  }

import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-docente-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './docente-sidebar.component.html',
  styleUrl: './docente-sidebar.component.css'
})
export class DocenteSidebarComponent {
  activeLink = '/docente-dashboard';
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

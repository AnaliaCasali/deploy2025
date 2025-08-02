import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink , RouterOutlet, CommonModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent  {
  activeLink = '/admin-dashboard';
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

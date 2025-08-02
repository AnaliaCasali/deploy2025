import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  activeLink = '/';
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

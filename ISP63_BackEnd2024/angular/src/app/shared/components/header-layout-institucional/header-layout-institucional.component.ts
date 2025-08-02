import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header-layout-institucional',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header-layout-institucional.component.html',
  styleUrls: ['./header-layout-institucional.component.css']
})
export class HeaderLayoutInstitucionalComponent  {
  estadobotonLogin: boolean = true;
  estadobotonSingUp: boolean = false;



  // botones login resaltado
  actDesc(isLoginButton: boolean): void {
    this.estadobotonLogin = isLoginButton;
    this.estadobotonSingUp = !isLoginButton;
  }

  // Cerrar el menú desplegable
  closeDropdown(): void {
    const dropdownMenu = document.getElementById('navbarNav');
    if (dropdownMenu && dropdownMenu.classList.contains('show')) {
      dropdownMenu.classList.remove('show');
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const dropdownMenu = document.getElementById('navbarNav');
    const navbarToggle = document.querySelector('.navbar-toggler');

    if (dropdownMenu && !dropdownMenu.contains(target) && navbarToggle && !navbarToggle.contains(target)) {
      this.closeDropdown();
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHeaderComponent } from './home-header.component';

describe('HomeHeaderComponent', () => {
  let component: HomeHeaderComponent;
  let fixture: ComponentFixture<HomeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/*
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SingUpComponent } from '../../../features/components/login/sing-up/sing-up.component';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [CommonModule, SingUpComponent], 
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {
  estadobotonLogin: boolean = true;
  estadobotonSingUp: boolean = false;
  activeLink: string = '';
  isAuthenticated: boolean = false; // Estado de autenticación

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAuthentication();
  }

  // Verificar si el usuario está autenticado al iniciar
  checkAuthentication(): void {
    const token = localStorage.getItem('authToken'); // Verificar si hay un token en localStorage ????
    this.isAuthenticated = !!token; // Si hay token, está autenticado
  }

  // opciones menu cuando se seleccionan
  setActiveLink(link: string): void {
    this.activeLink = link;
  }

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

*/

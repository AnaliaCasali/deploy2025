import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { SingUpComponent } from '../../../features/components/login/sing-up/sing-up.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';



@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [RouterModule, SingUpComponent, CommonModule],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.css'
})
export class HomeHeaderComponent    implements OnInit {

    miPerfil: string="";
    inicioSesion:boolean=false;
    constructor(private auth: AuthService) {}






  ngOnInit(): void {

    // Obtén el usuario y el rol desde localStorage
    if ( this.auth.isAuthenticated() ){
          this.inicioSesion=true;
          const rol = String( localStorage.getItem('rol'));
          console.log("EN LOGIN  ROL " + rol)
          // Redirige según el rol (puedes ajustar la ruta según tus necesidades)
          switch (rol) {
            case 'ADMIN':
                  this.miPerfil= '/admin-dashboard';
              break;
            case 'USER':
              this.miPerfil='/user-dashboard';
              break;
            case 'ESTUDIANTE':
              this.miPerfil='/estudiante-dashboard';
              break;
            case 'DOCENTE':
                this.miPerfil='/docente-dashboard';
                break;
            default:
              this.miPerfil='/';
              break;
          }
        }
//this.router.navigate(['auth']);





  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  }

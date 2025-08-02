import { Component } from '@angular/core';
import { AuthService } from '../../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export  class LoginComponent {

  user:string = "";
  password:string = "";

  constructor(private authService: AuthService, private router: Router) {
  }
  // Método para manejar el envío del formulario
  login(): void{

    this.authService.login(this.user,this.password).subscribe({
      next: () => {
                // Obtiene el rol del localStorage
            const rol = String( localStorage.getItem('rol'));
            console.log("EN LOGIN  ROL " + rol)
            // Redirige según el rol (puedes ajustar la ruta según tus necesidades)
            switch (rol) {
              case 'ADMIN':
                this.router.navigate(['/admin-dashboard']);
                break;
              case 'USER':
                this.router.navigate(['/user-dashboard']);
                break;
              case 'ESTUDIANTE':
                this.router.navigate(['/estudiante-dashboard']);
                break;
              case 'DOCENTE':
                  this.router.navigate(['/docente-dashboard']);
                  break;
              default:
                this.router.navigate(['/']);
                break;
            }
        //this.router.navigate(['auth']);

      },
      error: (err) => { console.log('Usuario o contraseña incorrectos', err)}
    });
  }




}

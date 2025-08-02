import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../modelo/user/user';
import { NotificacionService } from '../../../services/notificacion.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent  implements OnInit {

  rol: string = '';
  dni: string = '';
  userImageUrl: string = "";
  nombre: string = '';
  panelName: string= "";
  letra:String ='';
  user: User | null = null; // Para almacenar el usuario encontrado
  errorMessage: string = ''; // Para manejar errores

  notificacionesNoLeidas: number  = 0; // Aquí se guardará el número de notificaciones no leídas

  constructor(private notificacionService: NotificacionService,private auth: AuthService, private userService:UserService ) {}




  ngOnInit(): void {
    // Obtén el usuario y el rol desde localStorage
    if ( this.auth.isAuthenticated() ){
      this.rol =  String(localStorage.getItem('rol'));
      this.dni =String(localStorage.getItem('dni'));
      this.buscarUser();
      this.buscarCantidadNoficicacionesNoLeidas();
      this.panelName= "Panel de " + this.rol.toLocaleLowerCase();

    }
  }


  buscarCantidadNoficicacionesNoLeidas():void{
        this.notificacionService.contarNotificacionesNoLeidas(this.dni)
        .subscribe({
          next: (data) => {
            this.notificacionesNoLeidas = data;
          },
          error: (err) => {
            this.notificacionesNoLeidas = 0;
          }
        });

      }

      // Método para buscar usuario por DNI
      buscarUser(): void {
        if (this.dni) {
          this.userService.getUserByDni(this.dni).subscribe(
            (data) => {
              this.user = data;
              this.nombre=data.nombre + ' ' + data.apellido;
              if (this.nombre && this.nombre.length > 0) {
                this.letra= this.nombre.charAt(0).toUpperCase();
              }
              this.errorMessage = ''; // Limpiar mensaje de error
            },
            (error) => {
              this.errorMessage = 'Usuario no encontrado';
              this.user = null; // Limpiar el usuario si hay un error
            }
          );
        } else {
          this.errorMessage = 'Debe ingresar un DNI válido';
        }
      }
}



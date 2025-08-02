import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RutasRolService } from '../../../services/rutas-por-rol.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-derecho-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './menu-derecho-dashboard.component.html',
  styleUrl: './menu-derecho-dashboard.component.css'
})
export class MenuDerechoDashboardComponent implements OnInit {

  usuario: any = null;
  rol: string = '';
  dni: string = '';
  userImageUrl: string = "../../../../assets/img/image.png";
  panelName: string= "Panel del Administrador";
  rutasRol:any;  // Aquí se almacenarán las rutas
  textosYLinks: { textoLink: string, ruta: string }[] = []; // Propiedad para almacenar los textos y links



  constructor(private auth: AuthService, private rutasRolService: RutasRolService) {}


  ngOnInit(): void {
    // Obtengo el usuario y el rol desde localStorage
    if ( this.auth.isAuthenticated() ){
      this.rol =  String(localStorage.getItem('rol'));
      this.dni =String(localStorage.getItem('dni'));
    }
    const incluirEn = 'MenuDer'; // Cambia esto según el menú que necesites

    this.rutasRolService.getTextosYLinks(this.rol, incluirEn).subscribe(
      (data) => {
        this.textosYLinks = data; // Almacena los datos en la propiedad
        console.log('Textos y links:', this.textosYLinks);
      },
      (error) => {
        console.error('Error al obtener los textos y links:', error);
      }
    );
}
getIncluirEnKeys(): string[] {
  // Asegúrate de que rutasPorRolEspecifico esté definido
  return this.rutasRol ? Object.keys(this.rutasRol) : [];
}

/*  TODOS LOS MENUS PARA UN ROL
    this.rutasRolService.getRutasPorRolEspecifico(this.rol).subscribe(
      (data) => {
        this.rutasRol = data;
        console.log('Rutas para el rol:', this.rol, ' SON: '  ,this.rutasRol);
      },
      (error) => {
        console.error('Error al obtener las rutas para el rol:', error);
      }
    );
  }
*/
    // Método para obtener las claves de 'incluirEn'

/* TRAE TODOS LOS ROLES
    this.rutasRolService.getRutasPorRol().subscribe(
      (data) => {
        this.rutasPorRol = data;
        console.log('Rutas por rol:', this.rutasPorRol);
      },
      (error) => {
        console.error('Error al obtener las rutas:', error);
      }
    );*/


}


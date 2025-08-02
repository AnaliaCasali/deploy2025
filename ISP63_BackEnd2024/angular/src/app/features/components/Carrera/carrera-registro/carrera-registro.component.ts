import { CardSliderComponent } from './../../../../shared/components/card-slider/card-slider.component';
import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../../../services/imagen.service';
import Swal from 'sweetalert2';
import { MenuSuperiorDashboardComponent } from "../../../../shared/components/menu-superior-dashboard/menu-superior-dashboard.component";
import { SeccionCentralComponent } from '../../../../shared/components/seccion-central-dashboard/seccion-central.component';

@Component({
  selector: 'app-carrera-registro',
  standalone: true,
  imports: [FormsModule, CommonModule, SeccionCentralComponent, MenuSuperiorDashboardComponent, CardSliderComponent],
  templateUrl: './carrera-registro.component.html',
  styleUrls: ['./carrera-registro.component.css'] // Cambié styleUrl a styleUrls
})
export class CarreraRegistroComponent implements OnInit {
    sedes: string[] = ["LAS_TOSCAS", "AVELLANEDA", "FLORENCIA"];
    selectedFile!: File;
  carrera: Carrera = {
    carrera: '',
    plan: '',
    duracion: 0,
    campoOcupacional: '',
    sede: '',
    id: 0,
    logo:{
      id: 0,
      url: "string",
      alt: "string",
      nombre: "string",
      descripcion: ''
    }, link: ''
    }


  constructor(
    private carreraService: InfoCarrerasService,
    private imagenService: ImagenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carreraService.getCarrera(+id).subscribe((data) => {
        this.carrera = data;
      });
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveCarrera(): void {
    if (this.selectedFile) {
      // Si hay un archivo seleccionado (imagen), primero subimos la imagen
      this.imagenService.uploadImagen(this.selectedFile, "Logo " + this.carrera?.carrera).subscribe(
        (imagen) => {
          // Una vez que la imagen es subida, la asociamos a la carrera
          if (this.carrera) {
            this.carrera.logo = imagen;
            console.log("La imagen se guardó");

            // Después de asociar la imagen, guardamos o actualizamos la carrera
            this.carreraService.createCarrera(this.carrera).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'La carrera se guardó correctamente.',
                confirmButtonText: 'OK'
              });
              this.router.navigate(['/home']); // Cambia a la ruta que desees
            });
          }
        },
        (error) => {
          // Manejo de errores si falla la subida de imagen
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al subir la imagen. Inténtalo nuevamente.',
            confirmButtonText: 'OK'
          });
          console.error('Error al subir imagen', error);
        }
      );
    } else {
      // Si no hay archivo seleccionado, solo guardamos la carrera
      if (this.carrera) {
        this.carreraService.createCarrera(this.carrera).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La carrera se guardó correctamente.',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/home']); // Cambia a la ruta que desees
        });
      }
    }
  }
}

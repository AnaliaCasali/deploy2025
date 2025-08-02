import { environment } from '../../../../../environments/environment';
import { ToPdfService } from '../../../../shared/services/to-pdf.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../../../services/imagen.service';

@Component({
  selector: 'app-carrera-listado',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './carrera-listado.component.html',
  styleUrls: ['./carrera-listado.component.css'] // Corregido 'styleUrls'
})
export class CarreraListadoComponent implements OnInit, OnDestroy {
  carreras!: Carrera[];
  fileUrl: string | undefined;
  imageUrls: string[] = [];
  private authUrl: string=  environment.apiUrl  + 'auth/imagenes';
  constructor(
    private carreraService: InfoCarrerasService,
    private imagenService: ImagenService,
    private aPdfService: ToPdfService
  ) {}

  ngOnInit(): void {
    this.carreraService.getCarreras().subscribe((data) => {
      this.carreras = data;
//      console.log(JSON.stringify(this.carreras));
      this.convertToUrls();
    });
  }

  // Método para generar PDF
  aPdf(canvasElemento: string, contenedor: string) {
    this.aPdfService.GenerarPdf(canvasElemento, contenedor);
  }

  // Método para cargar archivo
  loadFile(id: number) {
    this.imagenService.getImagenFileAuth(id).subscribe((blob) => {
  //    console.log("Tipo de Blob: ", blob.type);
      const url =  URL.createObjectURL(blob);
      this.fileUrl = url;
    });
  }
  private convertToUrls(): void {
    this.carreras.forEach((carrera) => {
      let id=carrera.logo.id;
      carrera.logo.url=   `${this.authUrl}/archivo/${id}`
    //  console.log("imagen: " + carrera.id + " url: " + carrera.logo.url);
    });
  }

  // Convertir Blobs de imágenes a URLs utilizables
  private convertBlobsToUrls(): void {

    this.carreras.forEach((carrera) => {
        let id=carrera.logo.id;
        this.imagenService.getImagenFileAuth(id).subscribe({
          next: (blob) => {
            carrera.logo.url = URL.createObjectURL(blob);
//            console.log("imagen: " + carrera.id + " url: " + carrera.logo.url);
          },
          error: (err) => {
            console.warn(' imagen ERROR:' + carrera.logo.url +  ' error: ' +  err);
            console.error('Error al cargar la imagen' +  carrera.id + carrera.logo.url +  ' error: ' +  err);
          }
        });
    });
  }

  // Eliminar carrera por ID
  deleteCarrera(id: number): void {
    this.carreraService.deleteCarrera(id).subscribe(() => {
      this.carreras = this.carreras.filter((c) => c.id !== id);
    });
  }

  // Limpiar URLs de blobs al destruir el componente
  ngOnDestroy(): void {
    this.carreras.forEach((carrera) => {
      if (carrera?.logo?.url) {
        URL.revokeObjectURL(carrera.logo.url);
      }
    });
  }
}

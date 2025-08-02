import { ImagenService } from '../../../services/imagen.service';
import { Imagen } from '../../../modelo/imagen';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-imagen',
  standalone: true, // Marca el componente como independiente
  imports: [CommonModule, FormsModule], // Importar módulos necesarios para este componente
  templateUrl: './imagen.component.html',
  styleUrls: ['./imagen.component.css']
})
export class ImagenComponent implements OnInit {
  imagenes: Imagen[] = [];
  selectedFile: File | null = null;
  imagenUrl: SafeUrl | undefined; // URL segura para mostrar la imagen
  idImagen = 6; // ID de ejemplo para la imagen que quieras cargar

  alt: string = '';
  uploadResponse: Imagen | null = null;
  apiUrl: string = environment.apiUrl;
  fileUrl: string | undefined;

  constructor(
    private imagenService: ImagenService,

  ) {}

  ngOnInit(): void {

    this.getImagenes();

  }

  getImagenes(): void {
    this.imagenService.getAllImagenes().subscribe(
      (data: Imagen[]) => {
        this.imagenes = data;
        this.convertBlobsToUrls();

      },
      error => {
        console.error('Error al obtener imágenes', error);
      }
    );
  }

  loadFile(id: number) {
    this.imagenService.getImagenFile(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      this.fileUrl = url;
    });
   }

   private convertBlobsToUrls(): void {
     this.imagenes.map(imagen => {
      if (imagen) {
         this.imagenService.getImagenFile(imagen.id).subscribe(blob => {
           const imgUrl = window.URL.createObjectURL(blob);
          imagen.url = imgUrl;
          });
        }
      }
   )};

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


    uploadImage(alt: string): void {
      if (this.selectedFile) {
        this.imagenService.uploadImagen(this.selectedFile, alt).subscribe(
          (data: Imagen) => {
            console.log('Imagen subida:', data);
            this.getImagenes(); // Refrescar la lista de imágenes
          },
          error => {
            console.error('Error al subir imagen', error);
          }
        );
      }
    }
  }

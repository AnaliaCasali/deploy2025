import { ImagenService } from './../../../services/imagen.service';
import { Component, OnInit } from '@angular/core';
import { Carrera } from '../../../modelo/carreras/carrera';
import { InfoCarrerasService } from '../../../services/info-carreras.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-slider',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.css']
})
export class CardSliderComponent implements OnInit {
  now: Date = new Date();
  asignatura: String = "Ingeniería de Software I";
  fechaExamen: String = this.now.toLocaleString();
  tribunal: String = "Casali Analia , Alejos Zapata Miguel, Ramirez Mauto Elio Hernan";
  carreras!: Carrera[];
     fileUrl: string | undefined;
  imageUrls: string[] = [];

  constructor(
    private carreraService: InfoCarrerasService,
    private imagenService: ImagenService
  ) {}

  ngOnInit(): void {
    this.carreraService.getCarreras().subscribe(data => {
      this.carreras = data;
      this.convertBlobsToUrls();
    });

//    this.loadFile(30); // Reemplaza con un ID válido
  }

  loadFile(id: number) {
    this.imagenService.getImagenFile(id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      this.fileUrl = url;
    });
  }

  private convertBlobsToUrls(): void {
     this.carreras.map(carrera => {
      if (carrera) {
         const url= this.loadFile(carrera.logo.id); // Convierte el Blob a Object URL


         this.imagenService.getImagenFile(carrera.logo.id).subscribe(blob => {
           const imgUrl = window.URL.createObjectURL(blob);
          carrera.logo.url = imgUrl;
         console.log("imagen: " +  carrera.id +  " url: " + imgUrl)   });
        }
      }
  )};
}

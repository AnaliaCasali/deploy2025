import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../../modelo/Noticia';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { ListarNoticiasService } from '../../../services/listar-noticia.service';
import { ImagenService } from '../../../services/imagen.service';


@Component({
  selector: 'app-noticia',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css'] // Cambié styleUrl a styleUrls
})
export class NoticiaComponent implements OnInit {
    selectedFile!: File;
  noticia: Noticia = {
    titulo: '',
    subtitulo: '',
    texto: '',
    descripcion: '',
    fecha: '',
    id: 0,
    imagen:{
      id: 6,
      url: "/uploads/87a1eee1-24b6-4245-a02c-7ff5d995eefb_LogoIES63.png",
      alt: "Logo ies63",
      nombre: "87a1eee1-24b6-4245-a02c-7ff5d995eefb_LogoIES63.png",
      descripcion: ''
    }, vigente: true
    }




  constructor(
    private noticiaService:ListarNoticiasService,
    private imagenService: ImagenService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.noticiaService.getNoticia(+id).subscribe((data) => {
        this.noticia = data;
      });
    }
  }


  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }


  saveNoticia(): void {
    if (this.selectedFile) {
      // Si hay un archivo seleccionado (imagen), primero subimos la imagen
      this.imagenService.uploadImagen(this.selectedFile, "Logo " + this.noticia?.titulo).subscribe(
        (imagen) => {
          // Una vez que la imagen es subida, la asociamos a la carrera
          if (this.noticia) {
            this.noticia.imagen = imagen;
            console.log("La imagen se guardó");


            // Después de asociar la imagen, guardamos o actualizamos la carrera
            this.noticiaService.createNoticia(this.noticia).subscribe(() => {
              Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'La noticia se guardó correctamente.',
                confirmButtonText: 'OK'
              });
              this.router.navigate(['/noticias']);
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
      // Si no hay archivo seleccionado, solo guardamos la noticia
      if (this.noticia) {
        this.noticiaService.createNoticia(this.noticia).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'La noticia se guardó correctamente.',
            confirmButtonText: 'OK'
          });
          this.router.navigate(['/noticias']);
        });
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListarNoticiasService } from '../../../../services/listar-noticia.service';
import { Noticia } from '../../../../modelo/Noticia';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-noticia-detalle',
  standalone: true,
  imports: [CommonModule], // Importar CommonModule aquí para los pipes
  templateUrl: './noticia-detalle.component.html',
  styleUrls: ['./noticia-detalle.component.css']
})
export class NoticiaDetalleComponent implements OnInit {
  noticia: Noticia | undefined;
  id: number = 0;
  authUrl: string = environment.apiUrl + 'auth/imagenes';

  constructor(
    private route: ActivatedRoute,
    private listarNoticiasService: ListarNoticiasService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.listarNoticiasService.getNoticia(id).subscribe({
        next: (data) => {
          this.noticia = data;
          this.convertImageUrl(); // Llama al método para asignar la URL de la imagen
        },
        error: (error) => console.error('Error al cargar la noticia', error),
      });
    }
  }

  private convertImageUrl(): void {
    if (this.noticia && this.noticia.imagen) {
      const id = this.noticia.imagen.id;
      this.noticia.imagen.url = `${this.authUrl}/archivo/${id}`; // Asegúrate de tener el authUrl disponible
    }
  }
}

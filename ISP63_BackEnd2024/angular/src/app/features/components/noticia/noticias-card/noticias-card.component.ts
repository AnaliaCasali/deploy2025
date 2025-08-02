import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../../../modelo/Noticia';
import { ListarNoticiasService } from '../../../../services/listar-noticia.service';
import { CommonModule } from '@angular/common';
import { ImagenService } from '../../../../services/imagen.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../../core/services/auth.service';




@Component({
  selector: 'app-noticias-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './noticias-card.component.html',
  styleUrl: './noticias-card.component.css'
})
export class NoticiasCardComponent implements OnInit {


  listanoticias!: Noticia[]; // Todas las noticias
  noticiaPrincipal: Noticia | undefined; // Noticia principal
  fileUrl: string | undefined;
  imageUrls: string[] = [];
  authUrl: string = environment.apiUrl + 'auth/imagenes';
  rol: string = ''; // Variable para verificar si el usuario es admin




  // Variables para la paginación
  noticiasPaginadas: Noticia[] = []; // Noticias para la página actual
  currentPage: number = 1;
  pageSize: number = 6;
  largo: number = 0;


  constructor(private noticiasService: ListarNoticiasService, private imagenService: ImagenService, private auth: AuthService) {}


  ngOnInit(): void {
    this.cargarNoticias();


    if ( this.auth.isAuthenticated() ){
      this.rol =  String(localStorage.getItem('rol'));
    }
  }


  cargarNoticias() {
    this.noticiasService.getNoticias().subscribe(data => {
      // Filtrar noticias según el rol
      if (this.rol === 'ADMIN') {
        this.listanoticias = data;
      } else {
        // Si no es admin, mostrar solo las noticias vigentes
        this.listanoticias = data.filter(noticia => noticia.vigente);


      }


      this.largo=this.listanoticias.length;
      // Ordenar noticias por fecha en orden descendente
      this.listanoticias.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());




    // Asignar la primera noticia como noticia principal
    if (this.listanoticias.length > 0) {
      this.noticiaPrincipal = this.listanoticias[0]; // Primera noticia como la más reciente
      this.listanoticias.shift(); // Eliminar la primera noticia de la lista para que no se repita abajo
    }


      this.convertToUrls(); // Convertir las imágenes de todas las noticias
      this.setPage(this.currentPage); // Inicializar paginación
    });
  }


  borrarNoticia(id: number): void {
    this.noticiasService.deleteNoticia(id).subscribe(() => {
      // Filtrar la lista de noticias para actualizar la vista después de eliminar una noticia
      this.listanoticias = this.listanoticias.filter(noticia => noticia.id !== id);
      this.setPage(this.currentPage); // Actualizar la paginación
    });
  }
 


  loadFile(id: number) {
    this.imagenService.getImagenFileAuth(id).subscribe(blob => {
      const url = URL.createObjectURL(blob);
      this.fileUrl = url;
    });
  }


  private convertToUrls(): void {
    this.listanoticias.forEach((noticia) => {
      let id = noticia.imagen.id;
      noticia.imagen.url = `${this.authUrl}/archivo/${id}`;
      console.log("imagen: " + noticia.imagen.id + " url: " + noticia.imagen.url);
    });


    if (this.noticiaPrincipal) {
      let id = this.noticiaPrincipal.imagen.id;
      this.noticiaPrincipal.imagen.url = `${this.authUrl}/archivo/${id}`;
    }
  }




  // Configuración de paginación
  setPage(page: number): void {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    this.noticiasPaginadas = this.listanoticias.slice(startIndex, startIndex + this.pageSize);
  }


  get totalPages(): number {
    return Math.ceil(this.largo / this.pageSize);
  }


  // Función auxiliar para truncar texto
  truncateText(text: string, limit: number): string {
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  }
}

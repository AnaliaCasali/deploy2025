import { Component, OnDestroy, OnInit } from '@angular/core';
import { Evento } from '../../../../modelo/Evento';
import { EventoService } from '../../../../services/evento.service';
import { ImagenService } from '../../../../services/imagen.service';
import { environment } from '../../../../../environments/environment';
import { ToPdfService } from '../../../../shared/services/to-pdf.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
@Component({
  selector: 'app-eventos-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos-view.component.html',
  styleUrl: './eventos-view.component.css'
})
export class EventosViewComponent implements OnInit, OnDestroy {
  eventos!: Evento[];
  fileUrl: string | undefined;
  imageUrls: string[] = [];
  authUrl: string=  environment.apiUrl  + 'auth/imagenes';
  constructor(
    private eventoService: EventoService,
    private imagenService: ImagenService,
    private aPdfService: ToPdfService
  ) {}
  ngOnInit(): void {
    this.eventoService.getEventos().subscribe((data) => {
     // console.log("entro en ts");
      this.eventos = data;
      this.convertToUrls();
    //console.log(JSON.stringify(this.eventos));
});
  }
  // Método para generar PDF
  aPdf(canvasElemento: string, contenedor: string) {
    this.aPdfService.GenerarPdf(canvasElemento, contenedor);
  }
  // Método para cargar archivo
  loadFile(id: number) {
    this.imagenService.getImagenFileAuth(id).subscribe((blob) => {
      console.log("Tipo de Blob: ", blob.type);
      const url =  URL.createObjectURL(blob);
      this.fileUrl = url;
    });
  }
  private convertToUrls(): void {
    this.eventos.forEach((eventos) => {
      let id=eventos.imagen.id;
      eventos.imagen.url=   `${this.authUrl}/archivo/${id}`
      //console.log("imagen: " + eventos.id + " url: " + eventos.imagen.url);
    });
  }
  // Convertir Blobs de imágenes a URLs utilizables
  private convertBlobsToUrls(): void {
    this.eventos.forEach((evento) => {
        let id=evento.imagen.id;
        this.imagenService.getImagenFileAuth(id).subscribe({
          next: (blob) => {
            evento.imagen.url = URL.createObjectURL(blob);
        //    console.log("imagen: " + evento.id + " url: " + evento.imagen.url);
          },
          error: (err) => {
            console.warn(' imagen ERROR:' + evento.imagen.url +  ' error: ' +  err);
            console.error('Error al cargar la imagen' +  evento.id + evento.imagen.url +  ' error: ' +  err);
            return of([]);
          }
        });
    });
  }
  // Eliminar   por ID
  deleteEvento(id: number): void {
    this.eventoService.deleteEvento(id).subscribe(() => {
      this.eventos = this.eventos.filter((c) => c.id !== id);
    });
  }
  // Limpiar URLs de blobs al destruir el componente
  ngOnDestroy(): void {
    this.eventos.forEach((evento) => {
      if (evento?.imagen?.url) {
        URL.revokeObjectURL(evento.imagen.url);
      }
    });
  }
}

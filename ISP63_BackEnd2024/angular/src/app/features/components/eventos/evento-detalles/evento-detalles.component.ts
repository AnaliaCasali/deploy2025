import { Component, OnDestroy, OnInit } from '@angular/core';
import { Evento } from '../../../../modelo/Evento';
import { EventoService } from '../../../../services/evento.service';
import { ImagenService } from '../../../../services/imagen.service';
import { environment } from '../../../../../environments/environment';
import { ToPdfService } from '../../../../shared/services/to-pdf.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-eventos-detalles',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './evento-detalles.component.html',
   })
  export class EventosViewComponent implements OnInit, OnDestroy {
  toggleDetails(_t3: Evento) {
  throw new Error('Method not implemented.');
  }
    eventos!: Evento[];
    fileUrl: string | undefined;
    authUrl: string = environment.apiUrl + 'auth/imagenes';
  
    constructor(
      private eventoService: EventoService,
      private imagenService: ImagenService,
      private aPdfService: ToPdfService
    ) {}
  
    ngOnInit(): void {
      // Cargar los eventos al iniciar el componente
      this.eventoService.getEventos().subscribe((data) => {
        this.eventos = data;
        this.convertBlobsToUrls(); // Convertir Blobs a URLs después de obtener los eventos
      });
    }
  
    // Método para generar PDF
    aPdf(canvasElemento: string, contenedor: string) {
      this.aPdfService.GenerarPdf(canvasElemento, contenedor);
    }
  
    // Método para cargar archivo (en caso de que sea necesario individualmente)
    loadFile(id: number) {
      this.imagenService.getImagenFileAuth(id).subscribe((blob) => {
        const url = URL.createObjectURL(blob);
        this.fileUrl = url;
      });
    }
  
    // Convertir Blobs de imágenes a URLs utilizables
    private convertBlobsToUrls(): void {
      this.eventos.forEach((evento) => {
        const id = evento.imagen.id;
        this.imagenService.getImagenFileAuth(id).subscribe({
          next: (blob) => {
            evento.imagen.url = URL.createObjectURL(blob);
            console.log(`Imagen: ${evento.id} URL: ${evento.imagen.url}`);
          },
          error: (err) => {
            console.warn(`Error al cargar la imagen ${evento.id}:`, err);
          }
        });
      });
    }
  
    // Eliminar evento por ID
    deleteEvento(id: number): void {
      this.eventoService.deleteEvento(id).subscribe(() => {
        this.eventos = this.eventos.filter((evento) => evento.id !== id);
      });
    }
  
    // Limpiar URLs de blobs al destruir el componente
    ngOnDestroy(): void {
      this.eventos.forEach((evento) => {
        if (evento?.imagen?.url) {
          URL.revokeObjectURL(evento.imagen.url); // Revocar URLs para evitar fugas de memoria
        }
      });
    }
  }
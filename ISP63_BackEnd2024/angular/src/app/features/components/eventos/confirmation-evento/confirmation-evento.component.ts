import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation-evento',
  templateUrl: './confirmation-evento.component.html',
})
export class ConfirmationEventoComponent implements OnInit {
  titulo: string | undefined;
  subtitulo: string | undefined;
  inicio: string | undefined;
  fecha: string | undefined;
  descripcion: string | undefined;
  imagen: string | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener datos del evento desde la ruta
    this.route.queryParams.subscribe(params => {
      this.titulo = params['titulo'];
      this.subtitulo = params['subtitulo'];
      this.inicio = params['inicio'];
      this.fecha = params['fecha'];
      this.descripcion = params['descripcion'];
      this.imagen = params['imagen'];
    });
  }
}

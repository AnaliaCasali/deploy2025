import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-crear-evento',
  standalone: true,
  imports: [CommonModule, FormsModule], // Asegúrate de incluir FormsModule aquí
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css'],
})
export class CrearEventoComponent {
  titulo: string = '';
  subtitulo: string = '';
  fechaInicio: string = '';
  fechaEvento: string = '';
  descripcion: string = '';
  imagen: File | null = null;

  // Tu constructor y métodos aquí
}

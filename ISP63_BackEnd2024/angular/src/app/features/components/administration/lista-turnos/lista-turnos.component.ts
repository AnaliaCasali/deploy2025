import { Component } from '@angular/core';
import { TurnosService } from '../../../../services/turnos.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TurnoDTO } from '../../../../modelo/turnos/TurnoDTO';

@Component({
  selector: 'app-lista-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-turnos.component.html',
  styleUrl: './lista-turnos.component.css'
})
export class ListaTurnosComponent {
  turnos: TurnoDTO[] = []; // Arreglo para almacenar los turnos
  router: any;

  constructor(private turnosService: TurnosService) { }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    this.turnosService.findAll().subscribe(
      (data) => {
        this.turnos = data;
      },
      (error) => {
        console.error('Error al cargar turnos:', error);
      }
    );
  }
  editarTurno(id: number): void {
    // Redirige a una página de edición o abre un formulario con el ID de la mesa
    this.router.navigate(['/crearturno/:id', id]);
    console.log('Editar turno con ID:', id);
  }
  eliminarTurno(id: number): void {
    this.turnosService.deleteTurno(id).subscribe(
      (response) => {
        console.log('Turno eliminado:', response);
      },
      (error) => {
        console.error('Error al eliminar el turno:', error);
      }
    );
  }
}

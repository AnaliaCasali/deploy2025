import { Component } from '@angular/core';
import { TurnosService } from '../../../../services/turnos.service';
import { CommonModule } from '@angular/common';
import { TurnoDTO } from '../../../../modelo/turnos/TurnoDTO';

@Component({
  selector: 'app-lista-turnos-students',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-turnos-students.component.html',
  styleUrl: './lista-turnos-students.component.css'
})
export class ListaTurnosStudentsComponent {
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
}

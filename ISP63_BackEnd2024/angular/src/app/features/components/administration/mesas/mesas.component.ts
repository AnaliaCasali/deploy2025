import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TurnoDTO } from '../../../../modelo/turnos/TurnoDTO';
import { TurnosService } from '../../../../services/turnos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent{
  turno: TurnoDTO = {
    id: 0,
    turno: '',
    periodoInscripcionDesde: '',
    periodoInscripcionHasta: '',
    periodoExamenDesde: '',
    periodoExamenHasta: '',
    vigente: false,
  };

  isEditMode = false;

  constructor(private turnosService: TurnosService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ultimoId = 0; // Variable para almacenar el último ID utilizado

  ngOnInit(): void {
    // Detecta si hay un ID en los parámetros de ruta para editar
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.loadTurno(id);
    }
  }

  private loadTurno(id: number): void {
    this.turnosService.findById(id).subscribe({
      next: (turno) => this.turno = turno,
      error: (err) => console.error('Error al cargar el turno:', err)
    });
  }

  onSubmit() {
    if (this.isEditMode) {
      this.updateTurno();
      //this.turno.id = ++this.ultimoId; // Incrementar y asignar el nuevo ID
    } else {
      this.saveTurno();
      //this.turno.id = ++this.ultimoId; // Incrementar y asignar el nuevo ID
      console.log('Formulario enviado:', this.turno); // Puedes hacer el POST o manejo de datos aquí

    }
    // Lógica para enviar el formulario o guardar los datos
    // Llama al método que guarda el turno
    //this.saveTurno();

  }
  
  // Llama al servicio para guardar el turno
  saveTurno(): void {
    this.turnosService.saveTurno(this.turno).subscribe(
      (response) => {
        console.log('Turno guardado:', response);
        Swal.fire('Éxito', 'Turno creado correctamente', 'success');

      },
      (error) => {
        console.error('Error al guardar el turno:', error);
        Swal.fire('Error', 'No se pudo crear el turno', 'error');

      }
    );
  }
  updateTurno(): void {
    this.turnosService.editarTurno(this.turno.id, this.turno).subscribe({
      next: (response) => {
        console.log('Turno actualizado:', response);
        Swal.fire('Éxito', 'Turno actualizado correctamente', 'success');
        this.router.navigate(['/listaturnos']); // Redirige después de editar
      },
      error: (error) => {
        console.error('Error al actualizar el turno:', error)
        Swal.fire('Error', 'No se pudo actualizar el turno', 'error');
      }

    });
  }
}

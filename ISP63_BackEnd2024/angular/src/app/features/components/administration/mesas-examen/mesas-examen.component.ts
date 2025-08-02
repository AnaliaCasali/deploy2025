import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MesaExamenPostDTO } from '../../../../modelo/mesaExamen/mesaExamenPostDTO';
import { MesaExamenServiceService } from '../../../../services/mesa-examen-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LlamadoTurno } from '../../../../modelo/enums/LlamadoTurno';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { TurnosService } from '../../../../services/turnos.service';
import { UserService } from '../../../../services/user.service';
import { UserDTO } from '../../../../modelo/users/UserDTO';
import { TurnoDTO } from '../../../../modelo/turnos/TurnoDTO';
//import { AsignaturaDTO } from '../../../../modelo/materias/AsignaturaDTO';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { Materias } from '../../../../modelo/materias/materias';

@Component({
  selector: 'app-mesas-examen',
  standalone: true,
  imports: [
    RouterModule, FormsModule, CommonModule
  ],
  templateUrl: './mesas-examen.component.html',
  styleUrl: './mesas-examen.component.css'
})
export class MesasExamenComponent implements OnInit {
  mesaExamen: MesaExamenPostDTO = {
    id: 0,
    fechaHora: '',
    llamado: '',
    presidente: '',
    vocal1: '',
    vocal2: '',
    turno: -1,
    asignatura: -1,
    carreraId: -1
  };

  modoEdicion = false;
  llamadoTurnos = Object.values(LlamadoTurno);  // Esto obtiene los valores del enum
  selectedCarreraId!: number;  // Variable para almacenar el id de la carrera seleccionada
  docentes: UserDTO[] = [];
  asignaturas: Materias[] = []; // Aquí se guardarán todas las materias
  turnos: TurnoDTO[] = [];
  carreras: Carrera[] = [];// Lista de carreras
  errorMessage: string = '';

  constructor(private mesaExamenServiceService: MesaExamenServiceService,
    private infoMateriasService: InfoMateriasService,
    private turnosService: TurnosService,
    private userService: UserService,
    private infoCarrerasService: InfoCarrerasService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.obtenerDocentes();
    this.getTurnos();
    this.getCarreras();
    // Verificar si estamos en modo edición
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.modoEdicion = true;
       this.loadMesaExamen(id);
    }

  }
  private loadMesaExamen(id: number): void {
    this.mesaExamenServiceService.findByTurno(id).subscribe({
      next: (data: MesaExamenPostDTO) => {
        this.mesaExamen = data;  // Asigna los datos de la mesa obtenida al objeto mesaExamen
//        this.selectedCarreraId = this.mesaExamen.carreraId; // Asigna el ID de la carrera a la carrera seleccionada
        console.log('Mesa de examen cargada', JSON.stringify(this.mesaExamen));

        this.onCarreraChange(this.selectedCarreraId);  // Carga las asignaturas para esta carrera
      },
      error: (err) => {
        console.error('Error al cargar la mesa de exmamen:', err);
        this.errorMessage = 'Error al cargar la mesa de examen';
      }
    });
  }


  ultimoId = 0; // Variable para almacenar el último ID utilizado

  onSubmit() {
    if (this.modoEdicion) {
      this.updateMesaExamen();
    } else {
      this.saveMesaExamen();
    }
    this.mesaExamen.id = ++this.ultimoId; // Incrementar y asignar el nuevo ID
    console.log('Formulario enviado:', this.mesaExamen); // Puedes hacer el POST o manejo de datos aquí

    //this.saveMesaExamen();
  }

  // llama al metodo del servicio para guardar la mesa de examen
  saveMesaExamen(): void {

    console.log(JSON.stringify(this.mesaExamen));
    this.mesaExamenServiceService.saveMesaExamen(this.mesaExamen).subscribe(
      response => {
        console.log('Mesa de Examen guardada exitosamente', response);
      },
      error => {
        console.error('Error al guardar la mesa de examen', error);
      }
    );
  }

  updateMesaExamen(): void{
    this.mesaExamenServiceService.actualizarMesaExamen(this.mesaExamen.id, this.mesaExamen).subscribe({
      next: (response) => {
        console.log('Mesa de Examen actualizada:', response);
        this.router.navigate(['/listamesaexamen']); // Redirige después de editar
      },
      error: (error) => console.error('Error al actualizar la Mesa De Examen:', error)
    })
  }

  obtenerDocentes(): void {
    this.userService.getUsersByRol('DOCENTE').subscribe({
      next: (data) => this.docentes = data,
      error: (err) => this.errorMessage = 'Error al cargar docentes'
    });
  }

  // informacion de las materias
  obtenerMaterias(): void {
    this.infoMateriasService.obtenerDatos().subscribe((data: any) => {
      this.asignaturas = data;
    });

  }

  // Obtener todas las carreras
  getCarreras(): void {
    this.infoCarrerasService.getCarreras().subscribe(
      (data: Carrera[]) => {
        this.carreras = data;  // Asigna las carreras obtenidas
      },
      error => {
        console.error('Error al obtener carreras', error);
      }
    );
  }

  // Obtener materias por id de carrera al cambiar la selección
  onCarreraChange(carreraId: number): void {
    console.log('Carrera seleccionada:', carreraId); // Añade este log
    if (carreraId) {
      this.infoMateriasService.findByCarreraId(carreraId).subscribe(
        (response: Materias[]) => {
          this.asignaturas = response;  // Actualiza la lista de materias

          // Establece la asignatura en el formulario si estamos en modo edición
          if (this.modoEdicion) {
            this.mesaExamen.asignatura = this.asignaturas.find(materia => materia.id === this.mesaExamen.asignatura)?.id || -1;
          }
          console.log('Asignaturas cargadas:', this.asignaturas);
        },
        (error) => {
          console.error('Error al obtener asignaturas:', error);
        }
      );
    }
  }

  getTurnos(): void {
    this.turnosService.findAll().subscribe(
      (data: TurnoDTO[]) => {
        this.turnos = data;
      },
      (error) => {
        this.errorMessage = 'Error al obtener los turnos';
        console.error(error);
      }
    );
  }
}

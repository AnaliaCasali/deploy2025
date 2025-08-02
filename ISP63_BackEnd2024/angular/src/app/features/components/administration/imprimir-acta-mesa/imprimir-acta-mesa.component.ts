import { Component, OnInit } from '@angular/core';
import { ToPdfService } from '../../../../shared/services/to-pdf.service';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { alumno } from '../../../../modelo/alumnos/alumno';
import { alumnos } from '../../../../modelo/alumnos/alumnos';
import { Materias } from '../../../../modelo/materias/materias';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inscripcion } from '../../../../modelo/llamados/inscripcion';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-imprimir-acta-mesa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './imprimir-acta-mesa.component.html',
  styleUrl: './imprimir-acta-mesa.component.css'
})
export class ImprimirActaMesaComponent implements OnInit {

  filteredInscripMesas: alumno[] = [];
  datosAlumno?: alumnos;
  materias?: Materias;
  carreras?: Carrera[];

  fecha?: string;
  tribunal?: string;
  carreraXid?: string;
  anio?: number[];
  plan?: string;

  inscriptos: alumno[] = [];
  carreraSeleccionada!: number | null;
  materiaSeleccionada!: string | null;



  constructor(
     private aPdfService:ToPdfService,
     private infoMateriasService: InfoMateriasService,
     private infoCarrerasService: InfoCarrerasService,
     private infoLlamadosService: InfoLlamadosService,
     private router: Router
   ) {}


   ngOnInit(): void {
    // Obtener la lista de alumnos aceptados desde el servicio
     
    this.infoLlamadosService.ObtenerListaInscriptosAceptados().subscribe((data: alumno[]) => {
      this.filteredInscripMesas = data;
   });

   this.infoLlamadosService.currentInscriptos.subscribe((data) => {
    this.inscriptos = data.inscriptos;
    this.carreraSeleccionada = data.carrera;
    this.materiaSeleccionada = data.materia;
    this.anio = this.inscriptos.map(inscrito => inscrito.anio);

    });
  

  // informacion de las materias
  this.infoMateriasService.obtenerDatos().subscribe((data: any) => {
    this.materias = data;
    
  });

  this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[])=>{
    this.carreras=data;
    const carreraSeleccionadaObj = this.carreras.find(carrera => carrera.id === this.carreraSeleccionada);
      if (carreraSeleccionadaObj) {
        this.carreraXid = carreraSeleccionadaObj.carrera; 
        this.plan = carreraSeleccionadaObj.plan;
      }
  })

  this.infoLlamadosService.ObtenerDatos().subscribe((data: inscripcion[]) => {
  
    if (this.inscriptos.length > 0) {
  
      const primerInscripto = this.inscriptos[0];
      const inscripcionCorrespondiente = data.find(insc => insc.id === primerInscripto.idMesa);
  
      if (inscripcionCorrespondiente) {
  
        this.fecha = inscripcionCorrespondiente.fechayHora;
        this.tribunal = inscripcionCorrespondiente.tribunal;
        console.log("tribunal y fecha: ", this.tribunal, this.fecha);
      }}
  });
  
}

// imprimir pdf
aPdf(canvasElemento: string, contenedor: string): void {
  try {
    this.aPdfService.GenerarPdf(canvasElemento, contenedor);
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'El acta se imprimió correctamente.',
      confirmButtonText: 'OK'
    });
    this.router.navigate(['/admin-dashboard']);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al imprimir el acta. Inténtalo nuevamente.',
      confirmButtonText: 'OK'
    });
    
  }
}


}

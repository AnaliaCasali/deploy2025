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
import { Router, RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-imprimir-lista-insc',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './imprimir-lista-insc.component.html',
  styleUrl: './imprimir-lista-insc.component.css'
})
export class ImprimirListaInscComponent implements OnInit  {
  
  filteredInscripMesas: alumno[] = [];
  datosAlumno?: alumnos;
  materias?: Materias;
  carreras?: Carrera[];

  llamado?: string;
  fecha?: string;
  tribunal?: string;
  carreraXid?: string;
  anio?: number[];

  inscriptos: alumno[] = [];
  carreraSeleccionada!: number | null;
  materiaSeleccionada!: string | null;
  llamadoSeleccionada!: string | null;
  anioSeleccionada!: number | null;


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

   this.infoLlamadosService.currentListaInscriptos.subscribe((data) => {
    this.inscriptos = data.inscriptos;
    this.llamadoSeleccionada= data.llamado;
    this.anioSeleccionada=data.anio;
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
      text: 'La descarga se realizó correctamente.',
      confirmButtonText: 'OK'
    });
    
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema. Inténtalo nuevamente.',
      confirmButtonText: 'OK'
    });
    
  }
}



}

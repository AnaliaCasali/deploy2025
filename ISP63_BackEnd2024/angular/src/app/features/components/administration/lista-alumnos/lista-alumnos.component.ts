import { Component } from '@angular/core';

import { Carrera } from '../../../../modelo/carreras/carrera';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InfoAlumnosService } from '../../../../services/info-alumnos.service';
import { todosAlumnos } from '../../../../modelo/todosAlumnos/todosAlumnos';
import { localidades } from '../../../../modelo/Localidades/localidades';
import { ToPdfService } from '../../../../shared/services/to-pdf.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})
export class ListaAlumnosComponent {


//datos filtraods
filteredInscripMesas: todosAlumnos[] = [];
//datos originales
datosAlumno: todosAlumnos[]=[];


carreras?: Carrera[];
selectedCarrera: number | null = null;
selectedLocalidad: number | null = null;

carreraimpr?: string;
localimpr?: string;

localidades?: localidades[];


/*
selectedAnio: number | null = null;


aniosDisponibles: { value: number, label: string }[] = [{ value: 1, label: '1° año' },
  { value: 2, label: '2° año' },
  { value: 3, label: '3° año' },
  { value: 4, label: '4° año' }] ;
*/






carrerasFiltradas: { value: number, label: string }[] =  [];






constructor(private aPdfService:ToPdfService,
            
            private infoCarrerasService: InfoCarrerasService,
            
            private infoAlumnosService: InfoAlumnosService,
            private router: Router) {}


ngOnInit(): void {
    // Obtener la lista de alumnos desde el servicio
   
    this.infoAlumnosService.obtenerTodosAlumnos().subscribe((data: todosAlumnos[]) => {
      this.filteredInscripMesas = data;  
      this.datosAlumno = data;
      console.log(this.filteredInscripMesas);  
   
    });


    this.infoAlumnosService.obtenerLocalidades().subscribe((data: localidades[]) =>{
      this.localidades=data;})
 
    //
  this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[])=>{
    this.carreras=data;
  })
}

aPdf(canvasElemento: string, contenedor: string): void {
  const contenedorElement = document.getElementById(contenedor);
  if (contenedorElement) {
    contenedorElement.style.display = 'block'; 
  }

  try {
    this.aPdfService.GenerarPdf(canvasElemento, contenedor);

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Se realizó la descarga correctamente.',
      confirmButtonText: 'OK'
    });
    
    
    if (contenedorElement) {
      contenedorElement.style.display = 'none';
    }
    
    
  } catch (error) {
    
    if (contenedorElement) {
      contenedorElement.style.display = 'none';
    }

    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema. Inténtalo nuevamente.',
      confirmButtonText: 'OK'
    });

  }
}


/*
// filtrado por año
filtrarPorAnio(event: any) {
  this.selectedAnio = event.target.value;
  this.selectedMateria = null;
  const selectMateria = document.getElementById('selectAsignatura') as HTMLSelectElement;
  selectMateria.selectedIndex = 0;
  this.aplicarFiltros();
}
*/

filtrarPorLocalidad(event: any){
  const selectedValue = Number(event.target.value);
  this.selectedLocalidad = selectedValue === 0 ? null : Number(selectedValue);

  this.localimpr = this.localidades?.find(localidad => localidad.id === this.selectedLocalidad)?.localidad || 'Todas las localidades';


  this.aplicarFiltros();
}

//filtrado por carrera
filtrarPorCarrera(event: any) {
this.selectedCarrera = Number(event.target.value); 

this.carreraimpr = this.carreras?.find(carrera => carrera.id === this.selectedCarrera)?.carrera || 'Todas las carreras';


const selectedValue = Number(event.target.value);
  this.selectedCarrera = selectedValue === 0 ? null : Number(selectedValue);

  //this.selectedAnio = null;



/*
switch (this.selectedCarrera) {
  case 1:
    this.aniosDisponibles = [
      { value: 1, label: '1° año' },
      { value: 2, label: '2° año' },
      { value: 3, label: '3° año' }
    ];
   
    break;


  default:
    this.aniosDisponibles = [
      { value: 1, label: '1° año' },
      { value: 2, label: '2° año' },
      { value: 3, label: '3° año' },
      { value: 4, label: '4° año' }
    ];
   
    break;
}
*/
this.aplicarFiltros();


}


// busqueda de alumno por texto
buscarAlumno(event: any) {
  const textoBusqueda = event.target.value.toLowerCase();


  let alumnosFiltrados = this.datosAlumno?.filter(todosAlumnos =>
    this.removeAccents(todosAlumnos.apellidoyapellido.toLowerCase()).includes(textoBusqueda) ||
    todosAlumnos.carrera.toString().includes(textoBusqueda) ||
    this.removeAccents(todosAlumnos.dni.toLowerCase()).includes(textoBusqueda) ||
    todosAlumnos.dni.toString().includes(textoBusqueda) ||
    this.removeAccents(todosAlumnos.localidad.toLowerCase()).includes(textoBusqueda) ||
    this.removeAccents(todosAlumnos.email.toLowerCase()).includes(textoBusqueda)
  ) ?? [];




  this.filteredInscripMesas = alumnosFiltrados;
}


// Método para eliminar acentos
removeAccents(text: string): string {
return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}






aplicarFiltros() {


this.filteredInscripMesas = [...this.datosAlumno];




// Aplica filtros combinados
if (this.selectedLocalidad) {
  this.filteredInscripMesas = this.filteredInscripMesas.filter(todosAlumnos =>
    todosAlumnos.idLocalidad === this.selectedLocalidad
  );
}


if (this.selectedCarrera) {
  this.filteredInscripMesas = this.filteredInscripMesas.filter(todosAlumnos =>
    todosAlumnos.idCarrera === this.selectedCarrera
  );
}


/*
if (this.selectedAnio) {
  this.filteredInscripMesas = this.filteredInscripMesas.filter(alumno =>
    alumno.anio === this.selectedAnio
  );
}
*/




}






}

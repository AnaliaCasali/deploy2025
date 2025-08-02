import { Component } from '@angular/core';

import { inscripcion } from '../../../../modelo/llamados/inscripcion';
import { CommonModule } from '@angular/common';

import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { TurnosService } from '../../../../services/turnos.service';
import { TurnoHabilitadoDTO } from '../../../../modelo/turnos/TurnoHabilitadoDTO';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pre-inscripcion-mesa',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pre-inscripcion-mesa.component.html',
  styleUrl: './pre-inscripcion-mesa.component.css'
})
export class PreInscripcionMesaComponent {


  datosInscripcion!: inscripcion[];
  datosInscripcionSearch!: inscripcion[];
  selectedLlamado: string | null = null;
  selectedAnio: number | null = null;


  aniosDisponibles: { value: number, label: string }[] =
   [{ value: 1, label: '1° año' },
    { value: 2, label: '2° año' },
    { value: 3, label: '3° año' },
    { value: 4, label: '4° año' }] ;



  

  constructor(private infoLlamadosService: InfoLlamadosService,
    private turnosService: TurnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.infoLlamadosService.ObtenerDatos().subscribe((data: inscripcion[]) => {
      data.sort((a, b) => a.asignatura.localeCompare(b.asignatura));
      this.datosInscripcion = data;
      this.datosInscripcionSearch = data;
    
  });

  this.turnosService.obtenerTurnoHabilitado().subscribe({
    next: (data: TurnoHabilitadoDTO) => {
      console.log('Datos de TurnoHabilitadoDTO:', data); 

      if (!data.habilitado) { 
        Swal.fire({
          icon: 'info',
          title: 'El período de preinscripción ha finalizado.',
          text: 'Actualmente no están habilitadas las preinscripciones.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/estudiante-dashboard']);
        });
        return;
      }
    },
   
  });

}
/*
 

   // busqueda de alumno por texto
   buscarAlumno(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    this.datosInscripcion = this.datosInscripcionSearch?.filter(inscripcion =>
      this.normalizeString(inscripcion.anio).toLowerCase().startsWith(textoBusqueda) ||
      this.normalizeString(inscripcion.asignatura).toLowerCase().startsWith(textoBusqueda) ||
      this.normalizeString(inscripcion.carrera).toLowerCase().startsWith(textoBusqueda) ||
      this.normalizeString(inscripcion.tribunal).toLowerCase().startsWith(textoBusqueda) ||
      this.normalizeString(inscripcion.fechayHora).toLowerCase().startsWith(textoBusqueda) ||
      this.normalizeString(inscripcion.llamado).toLowerCase().startsWith(textoBusqueda) 
    ) ?? [];
  }

  // permite la busqueda sin acentos
normalizeString(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}
*/


removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
}

  // busqueda de alumno por texto
       buscarMesa(event: any) {
        const textoBusqueda = event.target.value.toLowerCase();
  
      let mesasFiltro = this.datosInscripcion?.filter(inscripcion =>
        this.removeAccents(inscripcion.asignatura.toLowerCase()).includes(textoBusqueda) ||
        this.removeAccents(inscripcion.carrera.toLowerCase()).includes(textoBusqueda) ||
        inscripcion.fechayHora.toString().includes(textoBusqueda) ||
        this.removeAccents(inscripcion.tribunal.toLowerCase()).includes(textoBusqueda) ||
        this.removeAccents(inscripcion.llamado.toLowerCase()).includes(textoBusqueda)
      ) ?? [];
    
  
      this.datosInscripcionSearch = mesasFiltro;
    }
  
 
// alerta muestra materias a las q se inscribio
showAlert = false;
selectedMaterias: { materia: string, fecha: string }[] = []; // Materias seleccionadas con fecha

// Cerrar alerta
closeAlert() {
  this.showAlert = false;
}

//seleccion de mesas 

toggleSelectAll(event: any) {
  const isChecked = event.target.checked;
  
  // Recorremos todas las mesas y cambiamos su estado de selección
  this.datosInscripcion.forEach(mesa => {
    mesa.seleccionada = isChecked;
  });
}

toggleMesaSelection(mesa: any) {
  mesa.seleccionada = !mesa.seleccionada;  // Cambiamos el estado seleccionado de la mesa
}



//guardar inscripcion 
submit() {
  
  const mesasSeleccionadas = this.datosInscripcion
    .filter(mesa => mesa.seleccionada)
    .map(mesa => mesa.id);

  
  if (mesasSeleccionadas.length === 0) {
    alert('Por favor, seleccione al menos una mesa.');
    return;
  }

  
  this.selectedMaterias = this.datosInscripcion
    .filter(mesa => mesa.seleccionada) 
    .map(mesa => ({ materia: mesa.asignatura, fecha: mesa.fechayHora }));
/* */

  // Mostrar la alerta modal
  this.showAlert = true;
    


  
  const estado = 'PENDIENTE';

  const materiasHtml = this.selectedMaterias.map(materia => 
    `<li class="m-2"> ${materia.materia} (${materia.fecha})</li>`
  ).join('');

  
  this.infoLlamadosService.saveInscripcion(mesasSeleccionadas, estado).subscribe(
    response => {
      
      Swal.fire({
        icon: 'success',
        title: 'Pre-inscripción registrada con éxito',
        html: `<ul>${materiasHtml}</ul>`, 
        confirmButtonText: 'OK'
      });

      
      this.router.navigate(['/estudiante-dashboard']);
      /*

  */    
      console.log('Inscripción guardada exitosamente', response);
    },
    error => {
      
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la inscripción.',
        text: 'Por favor, asegúrese de seleccionar únicamente un llamado para cada materia seleccionada.',
        confirmButtonText: 'OK'
      });
      console.error('Error al guardar la inscripción', error);
    }
  );
}





filtrarPorLlamado(event: any) {
  this.selectedLlamado = event.target.value;
  this.aplicarFiltros();
 
}


  // filtrado por año
  filtrarPorAnio(event: any) {
    this.selectedAnio = parseInt(event.target.value, 10);
  this.aplicarFiltros();
  }


  aplicarFiltros() {
 
    this.datosInscripcionSearch = [...this.datosInscripcion];
   
     
     if (this.selectedLlamado) {
       this.datosInscripcionSearch = this.datosInscripcionSearch.filter(inscripcion =>
        inscripcion.llamado === this.selectedLlamado
       );
     }
   
   
     if (this.selectedAnio) {
       this.datosInscripcionSearch = this.datosInscripcionSearch.filter(inscripcion =>
        inscripcion.anio === this.selectedAnio
       );
     }
   
     
   }


    // como se ven los filtros en pantallas pequeñas
    showFilters = false;


    toggleFilters() {
      this.showFilters = !this.showFilters;
    }
 




}

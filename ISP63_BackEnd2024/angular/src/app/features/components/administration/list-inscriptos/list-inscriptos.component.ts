import { Component } from '@angular/core';
import { alumnos } from '../../../../modelo/alumnos/alumnos';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';

import { CommonModule } from '@angular/common';

import { Materias } from '../../../../modelo/materias/materias';
import { InfoAlumnosService } from '../../../../services/info-alumnos.service';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { alumno } from '../../../../modelo/alumnos/alumno';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-list-inscriptos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-inscriptos.component.html',
  styleUrls: ['./list-inscriptos.component.css']
})
export class ListInscriptosComponent {
//datos filtraods
  filteredInscripMesas: alumno[] = [];
  //datos originales
  datosAlumno: alumno[]=[];
  
  materias: { id: number, nombre: string }[] = [];

  carreras?: Carrera[];

  turno?: string;

  selectedEstado: string | null = "PENDIENTE";
  selectedLlamado: string | null = null;
  selectedCarrera: number | null = null;
  selectedAnio: number | null = null;
  selectedMateria: string | null = null;
  


  aniosDisponibles: { value: number, label: string }[] = [{ value: 1, label: '1° año' },
    { value: 2, label: '2° año' },
    { value: 3, label: '3° año' },
    { value: 4, label: '4° año' }] ;


  asignaturasFiltradas: { value: string, label: string }[] =  [];

  carrerasFiltradas: { value: number, label: string }[] =  [];
 


  constructor(
              private infoMateriasService: InfoMateriasService,
              private infoCarrerasService: InfoCarrerasService,
              private infoLlamadosService: InfoLlamadosService,
              private router: Router) {}

  ngOnInit(): void {
      // 
      
      this.infoLlamadosService.ObtenerListaInscriptos().subscribe((data: alumno[]) => {
        this.filteredInscripMesas = data;  
        this.datosAlumno = data;
       
        if (data.length > 0) {
          this.turno = data[0].turno;
      }
        this.aplicarFiltros();
        //console.log(this.filteredInscripMesas);  
      }, error => {
        console.error('Error al obtener la lista de inscriptos:', error);
      });
    
      //
    this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[])=>{
      this.carreras=data;
    })
  }


// Seleccionar todos como aceptados
todAcep(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  this.filteredInscripMesas.forEach(alumno => {
    alumno.aceptado = isChecked;
    if (isChecked) { alumno.rechazado = false;}
  });
}

// Seleccionar todos como rechazados
todRech(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  this.filteredInscripMesas.forEach(alumno => {
    alumno.rechazado = isChecked;
    if (isChecked) {alumno.aceptado = false;}
  });
}

//aceptar individual
aceptado(alumno: any, event: Event) {
  alumno.aceptado = (event.target as HTMLInputElement).checked;
  if (alumno.aceptado) {alumno.rechazado = false;}
}

// Lógica individual para rechazar
rechazado(alumno: any, event: Event) {
  alumno.rechazado = (event.target as HTMLInputElement).checked;
  if (alumno.rechazado) {alumno.aceptado = false; }
}

// filtra por estado de los estudiantes
filtrarPorEstado(event: any){
  this.selectedEstado = event.target.value;
  this.aplicarFiltros();
}


  // filtrado por llamado
  filtrarPorLlamado(event: any) {
    this.selectedLlamado = event.target.value;
  
      
    /*
    const selectAño = document.getElementById('selectAño') as HTMLSelectElement;
    selectAño.selectedIndex = 0;
  
    const selectMateria = document.getElementById('selectAsignatura') as HTMLSelectElement;
    selectMateria.selectedIndex = 0;
    */
    this.aplicarFiltros();
    console.log(this.selectedLlamado);
}
/*  BORRAR


  // filtrado por asignatura
  filtrarPorAsignatura(event: any) {
    this.selectedMateria = event.target.value;

    if (this.selectedMateria === 'Todas las Materias') {
        this.aplicarFiltros();
        return;
    }

    this.aplicarFiltros();
}

  // filtrado por materias

  filtrarMaterias() {
    this.asignaturasFiltradas = [{ value: 'Todas las Materias', label: 'Todas las Materias' }];

    if (this.selectedCarrera !== 'Todas las carreras' && this.selectedAnio !== 'Todos los años') {
        const carreraSeleccionada = this.carreras?.find(c => c.carrera === this.selectedCarrera);

        if (!carreraSeleccionada || !this.materias) {
            return;
        }

        const materiasFiltradas = this.materias['filter']((materia: any) => materia.carrera_id === carreraSeleccionada.id && materia.anio === parseInt(this.selectedAnio));


        this.asignaturasFiltradas.push(...materiasFiltradas.map((materia: any) => ({
            value: materia.asignatura,
            label: materia.asignatura
        })));
    }
}



// filtrado por año
  filtrarPorAnio(event: any) {
    this.selectedAnio = event.target.value;
    this.aplicarFiltros();
    this.filtrarMaterias();
  }


*/


  // filtrado por año
  filtrarPorAnio(event: any) {
    this.selectedAnio = event.target.value;
    this.obtenerMaterias(); 
   
   
    this.selectedMateria = null;
    const selectMateria = document.getElementById('selectAsignatura') as HTMLSelectElement;
    selectMateria.selectedIndex = 0;
    this.aplicarFiltros();
  }

  filtrarPorAsignatura(event: any) {
    this.selectedMateria = event.target.value;
    this.aplicarFiltros();
  }

 //filtrado por carrera
 filtrarPorCarrera(event: any) {
  this.selectedCarrera = Number(event.target.value); // Convertir a número

    this.selectedAnio = null;
    this.selectedMateria = null;
    
    const selectAnio = document.getElementById('selectAnio') as HTMLSelectElement;
  if (selectAnio) selectAnio.selectedIndex = 0;
  
    const selectMateria = document.getElementById('selectAsignatura') as HTMLSelectElement;
    selectMateria.selectedIndex = 0;
  

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
  this.obtenerMaterias();
  this.aplicarFiltros();
  
}

  // busqueda de alumno por texto
  buscarAlumno(event: any) {
    const textoBusqueda = event.target.value.toLowerCase();

    let alumnosFiltrados = this.datosAlumno?.filter(alumno =>
      this.removeAccents(alumno.nombreApellido.toLowerCase()).includes(textoBusqueda) ||
      alumno.dni.toString().includes(textoBusqueda) ||
      this.removeAccents(alumno.materia.toLowerCase()).includes(textoBusqueda) ||
      alumno.anio.toString().includes(textoBusqueda) ||
      this.removeAccents(alumno.turnoLlamado.toLowerCase()).includes(textoBusqueda) ||
      this.removeAccents(alumno.carrera.toLowerCase()).includes(textoBusqueda)
    ) ?? [];
  

    this.filteredInscripMesas = alumnosFiltrados;
  }

// Método para eliminar acentos
removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


  // como se ven los filtros en pantallas pequeñas
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  // descargar lista alumnos
  downloadTableAsPDF() {
    window.print();
  }

 // envia estados de inscripcion y datos para la notificacion
 submitEstadoInsc() {
  
  const alumnosAceptados = this.filteredInscripMesas.filter(alumno => alumno.aceptado);
  const alumnosRechazados = this.filteredInscripMesas.filter(alumno => alumno.rechazado);

  const aceptados = alumnosAceptados.map(alumno => ({
    idInsc: alumno.idInsc,
    dni: alumno.dni,
    materia: alumno.materia,        
    turnoLlamado: alumno.turnoLlamado 
  }));
  
  const rechazados = alumnosRechazados.map(alumno => ({
    idInsc: alumno.idInsc,
    dni: alumno.dni,
    materia: alumno.materia,         
    turnoLlamado: alumno.turnoLlamado  
  }));

 
  this.infoLlamadosService.updateEstado(aceptados, rechazados).subscribe(
    () => {
     
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Los estados se actualizaron correctamente.',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/listainscriptos']);
    },
    (error) => {
     
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema. Inténtalo nuevamente.',
        confirmButtonText: 'OK'
      });
      this.router.navigate(['/listainscriptos']);
      console.error('Error al enviar los estados', error);
    }
  );


}


obtenerMaterias() {
 
  //if (this.selectedCarrera && this.selectedAnio !== 0) {
    if (this.selectedCarrera !== null && this.selectedAnio !== null && this.selectedAnio !== 0) {

      this.infoMateriasService.obtenerAsigAnioCarrera(this.selectedCarrera, this.selectedAnio).subscribe(
          (data: any[]) => {  
             
              this.materias = data.map(materia => ({
                  id: materia.id,             
                  nombre: materia.nombre
              }));
              console.log('Materias obtenidas:', this.materias);
          },
          error => {
              console.error('Error al obtener las materias:', error); 
          }
      );
  } else {
      console.warn('Por favor selecciona una carrera y un año válido.');
  }
}



aplicarFiltros() {
  
 this.filteredInscripMesas = [...this.datosAlumno];

  // Aplica filtros combinados
  if (this.selectedLlamado) {
    this.filteredInscripMesas = this.filteredInscripMesas.filter(alumno => 
      alumno.turnoLlamado === this.selectedLlamado
    );
  }

  if (this.selectedCarrera) {
    this.filteredInscripMesas = this.filteredInscripMesas.filter(alumno => 
      alumno.idcarrera === this.selectedCarrera
    );
  }

  if (this.selectedAnio) {
    this.filteredInscripMesas = this.filteredInscripMesas.filter(alumno => 
      alumno.anio === this.selectedAnio
    );
  }

  if (this.selectedMateria) {
    this.filteredInscripMesas = this.filteredInscripMesas.filter(alumno => 
      alumno.materia === this.selectedMateria
    );
  }

  if (this.selectedEstado) {
    this.filteredInscripMesas = this.filteredInscripMesas.filter(alumno => 
      alumno.condicion === this.selectedEstado
    );
  }
  
}

enviarDatosInsc() {

  if (!this.selectedLlamado || !this.selectedCarrera || !this.selectedAnio || !this.selectedMateria) {
    Swal.fire({
      icon: 'warning',
      title: 'Datos incompletos',
      text: 'Por favor, selecciona Llamado, Carrera, Año y Asignatura para continuar.',
      confirmButtonText: 'OK'
    });
    //this.router.navigate(['/listainscriptos']);
  } else {
  const datosInsc = {
    inscriptos: this.filteredInscripMesas, 
    llamado: this.selectedLlamado,
    anio: this.selectedAnio,
    carrera: this.selectedCarrera,         
    materia: this.selectedMateria          
  };
  this.router.navigate(['/imprimirListaInsc']);
  
  this.infoLlamadosService.updateListaInscriptos(datosInsc);
  }
}

//dashabilita el boton hasta que se seleccione cierta info
  isPrintDisabled(): boolean {
   
    return !this.selectedLlamado || !this.selectedCarrera || !this.selectedAnio || !this.selectedMateria;
  }
}

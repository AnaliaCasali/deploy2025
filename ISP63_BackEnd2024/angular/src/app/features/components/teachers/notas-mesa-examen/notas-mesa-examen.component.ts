import { Component } from '@angular/core';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { alumno } from '../../../../modelo/alumnos/alumno';
import { alumnos } from '../../../../modelo/alumnos/alumnos';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { Materias } from '../../../../modelo/materias/materias';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notas-mesa-examen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notas-mesa-examen.component.html',
  styleUrl: './notas-mesa-examen.component.css'
})
export class NotasMesaExamenComponent {

  filteredInscripMesas: alumno[] = [];
  datosAlumno: alumno[] = [];
  materias: { id: number, nombre: string }[] = [];

  carreras?: Carrera[];

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
      // Obtener la lista de alumnos desde el servicio
       
      this.infoLlamadosService.ObtenerListaInscriptosAceptados().subscribe((data: alumno[]) => {
        this.filteredInscripMesas = data;  
        this.datosAlumno=data;
        console.log(this.filteredInscripMesas);  
      }, error => {
        console.error('Error al obtener la lista de inscriptos:', error);
      });
    

    // informacion de los alumnos
    this.infoLlamadosService.ObtenerDatos().subscribe((data: any) => {
      this.datosAlumno = data;
      this.filteredInscripMesas = data.alumnos ?? [];
    });

    // informacion de las materias
    this.infoMateriasService.obtenerDatos().subscribe((data: any) => {
      this.materias = data;
      
    });

    this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[])=>{
      this.carreras=data;
    })
  }

    // como se ven los filtros en pantallas pequeñas
    showFilters = false;

    toggleFilters() {
      this.showFilters = !this.showFilters;
    }
  
  


 //ENVIA NOTAS
  errores: boolean[] = [];

  submitNotas() {
    let notasValidas = true;
  
    // Valida las notas antes de enviar los datos
    this.filteredInscripMesas.forEach((alumno, index) => {
        if (alumno.nota !== null && alumno.nota !== undefined && (alumno.nota < 1 || alumno.nota > 10)) {
            this.errores[index] = true;
            notasValidas = false;
        } else {
            this.errores[index] = false;
        }
    });

    if (notasValidas) {
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Las notas fueron guardadas con éxito.',
            confirmButtonText: 'OK'
        });

        this.router.navigate(['/docente-dashboard']);

    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error al cargar las notas.',
            confirmButtonText: 'OK'
        });
    }


  
   
   // if (!notasValidas) {console.log('No se pueden enviar las notas porque algunas no son válidas.');return; }
  
    // si las notas son correctas envia los datos
    const alumnosConNota = this.filteredInscripMesas
      // solo envia los datos de lso alumnos con notas
      .filter(alumno => alumno.nota !== null && alumno.nota !== undefined)
      .map(alumno => ({
        idInsc: alumno.idInsc,
        nota: alumno.nota,
        dni: alumno.dni,
        materia: alumno.materia,
        llamado: alumno.turnoLlamado
      }));
  
    if (alumnosConNota.length > 0) {
      this.infoLlamadosService.updateNota(alumnosConNota).subscribe(
        () => {
          console.log('Notas enviadas correctamente');
        },
        (error) => {
          console.error('Error al enviar las notas', error);
        }
      );
    } else {
      console.log('No se enviaron datos porque no hay notas válidas.');
    }
  }
  
  // valida los cambios de notas
  validarNota(alumno: any, index: number) {
    if (alumno.nota !== null && alumno.nota !== undefined && (alumno.nota < 1 || alumno.nota > 10)) {
      this.errores[index] = true; 
    } else {
      this.errores[index] = false; 
    }
  }
  
 // filtrado por llamado
 filtrarPorLlamado(event: any) {
  this.selectedLlamado = event.target.value;
  this.selectedCarrera
  this.selectedCarrera=null;
  this.selectedAnio = null;
  this.selectedMateria = null;
  this.materias = []; 
  const selectCarrera = document.getElementById('selectCarrera') as HTMLSelectElement;
  selectCarrera.selectedIndex = 0;

  const selectAño = document.getElementById('selectAño') as HTMLSelectElement;
  selectAño.selectedIndex = 0;

  const selectMateria = document.getElementById('selectAsignatura') as HTMLSelectElement;
  selectMateria.selectedIndex = 0;
  this.aplicarFiltros();
  console.log(this.selectedLlamado);
}
  
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
    
    const selectAño = document.getElementById('selectAño') as HTMLSelectElement;
    selectAño.selectedIndex = 0;
  
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

  }
  
  
  
  

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { inscripcion } from '../../../../modelo/llamados/inscripcion';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { MesaExamenServiceService } from '../../../../services/mesa-examen-service.service';
import { RouterLink } from '@angular/router';

import { Router } from '@angular/router';
import { ToPdfService } from '../../../../shared/services/to-pdf.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-lista-mesa-examen',
  standalone: true,
  imports: [CommonModule, FormsModule,  RouterLink],
  templateUrl: './lista-mesa-examen.component.html',
  styleUrl: './lista-mesa-examen.component.css'
})
export class ListaMesaExamenComponent {
  mesas!: inscripcion[];
  mesasFiltradas!: inscripcion[];

  materias: { id: number, nombre: string }[] = [];

  carreras?: Carrera[];
  carreraXid?: string;
  selectedLlamado: string | null = null;
  selectedCarrera: number | null = null;
  selectedAnio: number | null = null;
  selectedMateria: string | null = null;



  aniosDisponibles: { value: number, label: string }[] = [
    { value: 1, label: '1° año' },
    { value: 2, label: '2° año' },
    { value: 3, label: '3° año' },
    { value: 4, label: '4° año' }
  ];
;


  asignaturasFiltradas: { value: string, label: string }[] =  [];

  carrerasFiltradas: { value: number, label: string }[] =  [];

  constructor(  private infoMateriasService: InfoMateriasService,
    private infoCarrerasService: InfoCarrerasService,
    private infoLlamadosService: InfoLlamadosService,
    private mesaExamenServiceService: MesaExamenServiceService,
    private aPdfService:ToPdfService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.infoLlamadosService.ObtenerDatos().subscribe((data: inscripcion[]) => {
      this.mesas= data;
      this.mesasFiltradas = data;
      console.log(this.mesas);
    });

    this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[])=>{
      this.carreras=data;
      console.log(this.carreras);
    })
  }

  getCardClass(id: number): string { //cambiar por id
    switch(id) {
      case 1:
        return 'highlight-informatica';
      case 2:
        return 'highlight-primaria';
      case 3:
        return 'highlight-lengua';
      case 4:
      return 'highlight-mantInd';
      case 5:
        return 'highlight-biolog';
      default:
        return 'highlight-default';
    }
  }

  onDelete(mesa: any): void {
    console.log(`Eliminando la mesa: ${mesa.materia}`);

  }



     // busqueda de alumno por texto
     buscarMesa(event: any) {
      const textoBusqueda = event.target.value.toLowerCase();

    let mesasFiltro = this.mesas?.filter(inscripcion =>
      this.removeAccents(inscripcion.asignatura.toLowerCase()).includes(textoBusqueda) ||
      this.removeAccents(inscripcion.carrera.toLowerCase()).includes(textoBusqueda) ||
      this.removeAccents(inscripcion.fechayHora.toLowerCase()).includes(textoBusqueda) ||
      inscripcion.fechayHora.toString().includes(textoBusqueda) ||
      this.removeAccents(inscripcion.tribunal.toLowerCase()).includes(textoBusqueda) ||
      this.removeAccents(inscripcion.llamado.toLowerCase()).includes(textoBusqueda)
    ) ?? [];


    this.mesasFiltradas = mesasFiltro;
  }

  // Método para eliminar acentos
removeAccents(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


  // permite la busqueda sin acentos
normalizeString(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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


// filtrado por llamado
filtrarPorLlamado(event: any) {
  this.selectedLlamado = event.target.value;
  this.selectedCarrera
  this.selectedCarrera=null;
  this.selectedAnio = null;


  const selectCarrera = document.getElementById('selectCarrera') as HTMLSelectElement;
  selectCarrera.selectedIndex = 0;

  const selectAño = document.getElementById('selectAño') as HTMLSelectElement;
  selectAño.selectedIndex = 0;

  this.aplicarFiltros();
  console.log(this.selectedLlamado);
}

// filtrado por año
filtrarPorAnio(event: any) {
  this.selectedAnio = Number(event.target.value);
   this.aplicarFiltros();
}



//filtrado por carrera
filtrarPorCarrera(event: any) {
this.selectedCarrera = Number(event.target.value);

  this.selectedAnio = null;


  const selectAño = document.getElementById('selectAño') as HTMLSelectElement;
  selectAño.selectedIndex = 0;

  //asigna el nombre de la carrera segun el id
  const carreraSeleccionada = this.carreras?.find(carrera => carrera.id === this.selectedCarrera);
  this.carreraXid = carreraSeleccionada ? carreraSeleccionada.carrera : '';

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

this.aplicarFiltros();

}




aplicarFiltros() {

  this.mesasFiltradas = [...this.mesas];

   // Aplica filtros combinados
   if (this.selectedLlamado) {
     this.mesasFiltradas = this.mesasFiltradas.filter(mesas =>
       mesas.llamado === this.selectedLlamado
     );
   }

   if (this.selectedCarrera) {

    this.mesasFiltradas = this.mesasFiltradas.filter(mesas => {
      console.log("Comparando mesa carrera ID:", mesas.idCarrera, "con", this.selectedCarrera);
      return mesas.idCarrera === this.selectedCarrera;
    });
  }

   if (this.selectedAnio) {
     this.mesasFiltradas = this.mesasFiltradas.filter(mesas =>
      mesas.anio === this.selectedAnio
     );
   }




 }

  // como se ven los filtros en pantallas pequeñas
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
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
        this.normalizeString(inscripcion.llamado).toLowerCase().startsWith(textoBusqueda) ||
        this.normalizeString(inscripcion.fechayHora).toLowerCase().startsWith(textoBusqueda)

      ) ?? [];
    }

*/
  // Método para editar una mesa de examen
  editarMesa(id: number): void {
    // Redirige a una página de edición o abre un formulario con el ID de la mesa
    this.router.navigate(['/agregarmesaexamen/:id', id]);
    console.log('Editar mesa con ID:', id) ;
  }

  eliminarMesaExamen(id: number) {
    this.mesaExamenServiceService.deleteMesaExamen(id).subscribe(
      response => {
      console.log('Mesa de examen eliminada:', response);
    },
      error => {
        console.error('Error al eliminar la mesa de examen:', error);
      }
    );
  }

aPdf(canvasElemento: string, contenedor: string): void {

  if (!this.selectedCarrera) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, selecciona una carrera.',
      confirmButtonText: 'OK'
    });
    return;
  }

  const contenedorElement = document.getElementById(contenedor);
  if (contenedorElement) {
    contenedorElement.style.display = 'block';
  }

  try {

    this.aPdfService.GenerarPdf(canvasElemento, contenedor);


    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Se descargó correctamente.',
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
      text: 'Hubo un problema al descargar. Intentelo de nuevo',
      confirmButtonText: 'OK'
    });
  }
}

}

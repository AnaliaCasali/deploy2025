import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { inscripcion } from '../../../../modelo/llamados/inscripcion';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { InfoMateriasService } from '../../../../services/info-materias.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mesas-examen-tribunal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mesas-examen-tribunal.component.html',
  styleUrl: './mesas-examen-tribunal.component.css'
})
export class MesasExamenTribunalComponent {
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
  ];;


  asignaturasFiltradas: { value: string, label: string }[] =  [];

  carrerasFiltradas: { value: number, label: string }[] =  [];

  constructor(  private infoMateriasService: InfoMateriasService,
    private infoCarrerasService: InfoCarrerasService,
    private infoLlamadosService: InfoLlamadosService,

  ) {}

  ngOnInit(): void {
    this.infoLlamadosService.ObtenerDatosMesasProf().subscribe((data: inscripcion[]) => {
      this.mesas= data;
      this.mesasFiltradas = data;
     // console.log(this.mesas);
    });

    this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[])=>{
      this.carreras=data;
    //  console.log(this.carreras);
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



obtenerMaterias() {
 
  //if (this.selectedCarrera && this.selectedAnio !== 0) {
    if (this.selectedCarrera !== null && this.selectedAnio !== null && this.selectedAnio !== 0) {

      this.infoMateriasService.obtenerAsigAnioCarrera(this.selectedCarrera, this.selectedAnio).subscribe(
          (data: any[]) => {  
             
              this.materias = data.map(materia => ({
                  id: materia.id,             
                  nombre: materia.nombre
              }));
          },
        
      );
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
  // console.log(this.selectedLlamado);
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




}

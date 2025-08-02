import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { inscripcion } from '../../../../modelo/llamados/inscripcion';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';
import { InfoMateriasService } from '../../../../services/info-materias.service';

@Component({
  selector: 'app-lista-mesa-examen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-mesa-examen.component.html',
  styleUrl: './lista-mesa-examen.component.css'
})
export class ListaMesaExamenComponent {
  mesas!: inscripcion[];
  mesasFiltradas!: inscripcion[];
 
  selectedLlamado: string | null = null;
  
  selectedAnio: number | null = null;
  
  


  aniosDisponibles: { value: number, label: string }[] = [
    { value: 1, label: '1° año' },
    { value: 2, label: '2° año' },
    { value: 3, label: '3° año' },
    { value: 4, label: '4° año' }
  ];;


  

  

  constructor(  private infoMateriasService: InfoMateriasService,
    private infoCarrerasService: InfoCarrerasService,
    private infoLlamadosService: InfoLlamadosService
  ) {}

  ngOnInit(): void {
    this.infoLlamadosService.ObtenerDatos().subscribe((data: inscripcion[]) => {
      this.mesas= data;
      this.mesasFiltradas = data;
      console.log(this.mesas);
    });

   
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

  
  

// filtrado por llamado
filtrarPorLlamado(event: any) {
  this.selectedLlamado = event.target.value;
 
  this.selectedAnio = null;
 


  const selectedAnio = document.getElementById('selectedAnio') as HTMLSelectElement;
  selectedAnio.selectedIndex = 0;

  this.aplicarFiltros();
  console.log(this.selectedLlamado);
}

// filtrado por año
filtrarPorAnio(event: any) {
  this.selectedAnio = Number(event.target.value);
   this.aplicarFiltros();
}





aplicarFiltros() {

    
 this.mesasFiltradas = [...this.mesas];
  
  if (this.selectedLlamado) {
    this.mesasFiltradas = this.mesasFiltradas.filter(inscripcion => 
       inscripcion.llamado=== this.selectedLlamado
    );
  }
 
  if (this.selectedAnio) {
    this.mesasFiltradas = this.mesasFiltradas.filter(inscripcion => 
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

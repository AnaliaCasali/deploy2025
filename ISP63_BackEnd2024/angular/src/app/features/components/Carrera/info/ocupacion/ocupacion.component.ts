import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ocupacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ocupacion.component.html',
  styleUrl: './ocupacion.component.css'
})
export class OcupacionComponent {
  activeTab: string = 'perfil';  // La pestaña activa por defecto
  carrera: string | undefined;

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  constructor( private router:Router) {

  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    this.carrera = navigation.extras.state['carrera'];
    switch(this.carrera){
      case 'tecnicatura':
        activeTab:  'perfil';
        break;
        case 'lengua':
        activeTab:  'perfilL';
        break;
        case 'primaria':
        activeTab:  'perfilP';
        break;

      }
  }

}
}

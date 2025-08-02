import { Component, OnInit } from '@angular/core';
import { CorrelatividadTsdsComponent } from "./correlatividad-tsds/correlatividad-tsds.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-correlatividad-tecnicatura',
  standalone: true,
  imports: [CorrelatividadTsdsComponent, CommonModule],
  templateUrl: './correlatividad-tecnicatura.component.html',
  styleUrl: './correlatividad-tecnicatura.component.css'
})
export class CorrelatividadTecnicaturaComponent {
  carrera: string | undefined;

  constructor( private router:Router) {

  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    this.carrera = navigation.extras.state['carrera'];
  }
  }


  activeTab: string = 'primero';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

import { Component, OnInit } from '@angular/core';
import { PlanTecnicaturaComponent } from "./plan-tecnicatura/plan-tecnicatura.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PlanLenguaComponent } from "./plan-lengua/plan-lengua.component";
import { PlanPrimariaComponent } from "./plan-primaria/plan-primaria.component";
import { PlanTsmiComponent } from "./plan-tsmi/plan-tsmi.component";
import { PlanBiologiaComponent } from "./plan-biologia/plan-biologia.component";

@Component({
  selector: 'app-plan-estudio',
  standalone: true,
  imports: [PlanTecnicaturaComponent, CommonModule, PlanLenguaComponent, PlanPrimariaComponent, PlanTsmiComponent, PlanBiologiaComponent],
  templateUrl: './plan-estudio.component.html',
  styleUrl: './plan-estudio.component.css'
})
export class PlanEstudioComponent {
  carrera: string | undefined;

  constructor( private router:Router) {

  const navigation = this.router.getCurrentNavigation();
  if (navigation?.extras.state) {
    this.carrera = navigation.extras.state['carrera'];
  }
  }

}

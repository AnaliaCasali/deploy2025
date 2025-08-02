import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plan-tecnicatura',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './plan-tecnicatura.component.html',
  styleUrl: './plan-tecnicatura.component.css'
})
export class PlanTecnicaturaComponent {
  activeTab: string = 'primero';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

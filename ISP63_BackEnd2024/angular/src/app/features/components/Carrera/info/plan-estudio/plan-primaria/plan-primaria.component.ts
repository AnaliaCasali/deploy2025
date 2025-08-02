import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-primaria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-primaria.component.html',
  styleUrl: './plan-primaria.component.css'
})
export class PlanPrimariaComponent {
  activeTab: string = 'primero';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}

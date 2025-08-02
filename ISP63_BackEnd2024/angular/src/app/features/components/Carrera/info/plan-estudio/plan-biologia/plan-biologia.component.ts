import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-biologia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-biologia.component.html',
  styleUrl: './plan-biologia.component.css'
})
export class PlanBiologiaComponent {
  activeTab: string = 'primero';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}

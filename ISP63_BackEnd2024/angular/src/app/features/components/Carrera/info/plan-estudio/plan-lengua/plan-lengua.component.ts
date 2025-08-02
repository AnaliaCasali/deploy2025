import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-plan-lengua',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plan-lengua.component.html',
  styleUrl: './plan-lengua.component.css'
})
export class PlanLenguaComponent {
  activeTab: string = 'primero';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

}

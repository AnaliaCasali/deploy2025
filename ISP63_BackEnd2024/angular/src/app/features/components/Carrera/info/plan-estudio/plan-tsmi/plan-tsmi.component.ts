import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-plan-tsmi',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './plan-tsmi.component.html',
  styleUrl: './plan-tsmi.component.css'
})
export class PlanTsmiComponent {
  activeTab: string = 'primero';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

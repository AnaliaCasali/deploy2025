import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-correlatividad-tsds',
  standalone: true,
  imports: [CommonModule, ],
  templateUrl: './correlatividad-tsds.component.html',
  styleUrl: './correlatividad-tsds.component.css'
})
export class CorrelatividadTsdsComponent {
  activeTab: string = 'perfil';  // La pestaña activa por defecto

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}

import { Component } from '@angular/core';
import { MesasComponent } from "./mesas/mesas.component";
import { MesasExamenComponent } from "./mesas-examen/mesas-examen.component";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [MesasComponent, MesasExamenComponent],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent {

}

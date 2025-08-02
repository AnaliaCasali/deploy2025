import { Component } from '@angular/core';
import { Notas } from '../../../../modelo/notasGet/notas';
import { InfoLlamadosService } from '../../../../services/info-llamados.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notas-mesa-examen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notas-mesa-examen.component.html',
  styleUrl: './notas-mesa-examen.component.css'
})
export class NotasMesaExamenComponent {

  infoNotas?: Notas[];

  constructor(private infoLlamadosService: InfoLlamadosService) {}

  ngOnInit(): void {
    this.infoLlamadosService.ObtenerNotas().subscribe((data: Notas[]) => {
      this.infoNotas = data;
      
      console.log(this.infoNotas);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventCalendarComponent } from '../event-calendar/event-calendar.component';
import { MenuDerechoDashboardComponent } from '../menu-derecho-dashboard/menu-derecho-dashboard.component';
import { NotificacionesListadoComponent } from "../../../features/components/notificaciones-listado/notificaciones-listado.component";

@Component({
  selector: 'app-seccion-central',
  standalone: true,
  imports: [FullCalendarModule, EventCalendarComponent, MenuDerechoDashboardComponent, NotificacionesListadoComponent],
  templateUrl: './seccion-central.component.html',
  styleUrl: './seccion-central.component.css'
})
export class SeccionCentralComponent  implements OnInit{
  recargar: any;
  ngOnInit():void{

 }
}

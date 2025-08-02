import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { SidebarComponent } from "./shared/components/sidebar/sidebar.component";
import { FooterComponent } from "./shared/components/footer/footer.component";

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EstudianteSidebarComponent } from "./shared/components/side-roles/estudiante-sidebar/estudiante-sidebar.component";


@Component({
  selector: 'app-root',
  standalone: true,
 imports: [RouterOutlet,
    HeaderComponent, EstudianteSidebarComponent, FooterComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ISP63_FrontEnd2024';

}

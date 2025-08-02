import { Component } from '@angular/core';
import { NavbarlateralComponent } from "./navbarlateral/navbarlateral.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarlateralderechaComponent } from "./navbarlateralderecha/navbarlateralderecha.component";
import { MainComponent } from "./main/main.component";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [NavbarlateralComponent, RouterLink, NavbarlateralderechaComponent, MainComponent,  RouterOutlet],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent {

}

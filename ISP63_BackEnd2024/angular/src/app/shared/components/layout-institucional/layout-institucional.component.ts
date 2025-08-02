import { Component, OnInit } from '@angular/core';
import { HeaderLayoutInstitucionalComponent } from "../header-layout-institucional/header-layout-institucional.component";
import { FooterComponent } from "../footer/footer.component";
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
 import { HomeHeaderComponent } from "../home-header/home-header.component";
import { CommonModule } from '@angular/common';
import { CarrerasDetalleSidebarComponent } from "../side-roles/carreras-detalle-sidebar/carreras-detalle-sidebar.component";

@Component({
  selector: 'app-layout-institucional',
  standalone: true,
  imports: [CommonModule, HeaderLayoutInstitucionalComponent, FooterComponent, RouterOutlet, HeaderComponent, HomeHeaderComponent, CarrerasDetalleSidebarComponent],
  templateUrl: './layout-institucional.component.html',
  styleUrl: './layout-institucional.component.css'
})
export class LayoutInstitucionalComponent implements OnInit{
  constructor(private router:Router){}
  carreraSelecionada:string='';
  ngOnInit(): void {
    const currentUrl = this.router.url;
//    console.log('Current URL:', currentUrl);

    if (currentUrl === '/tecnicatura') {
      this.carreraSelecionada ='tecnicatura';
    }
    if (currentUrl === '/lengua') {
      this.carreraSelecionada ='lengua';
    }
    if (currentUrl === '/primaria') {
      this.carreraSelecionada ='primaria';
    }

    if (currentUrl === '/biologia') {
      this.carreraSelecionada ='biologia';
    }

    if (currentUrl === '/tsmi') {
      this.carreraSelecionada ='tsmi';
    }

  }


}

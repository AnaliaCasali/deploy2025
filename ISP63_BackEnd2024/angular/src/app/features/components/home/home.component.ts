import { Component } from '@angular/core';
import { NoticiaComponent } from '../noticia/noticia.component';
import { NoticiasCardComponent } from "../noticia/noticias-card/noticias-card.component";
import { TestimonialComponent } from "./testimonial/testimonial.component";
import { ContactoComponent } from "./contacto/contacto.component";
import { RouterLink, RouterModule } from '@angular/router';
import { CarreraListadoComponent } from "../Carrera/carrera-listado/carrera-listado.component";


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NoticiasCardComponent, TestimonialComponent, ContactoComponent, RouterLink,
    RouterModule, CarreraListadoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  scrollToNoticias(): void {
    const noticiasElement = document.querySelector('#noticias-section');
    if (noticiasElement) {
      noticiasElement.scrollIntoView({ behavior: 'smooth' });
    }
  }




}

import { Component } from '@angular/core';
import { UserRegistroComponent } from '../../user-registro/user-registro.component';

@Component({
  selector: 'app-sing-up',
  standalone: true,
  imports: [UserRegistroComponent],
  templateUrl: './sing-up.component.html',
  styleUrl: './sing-up.component.css'
})
export class SingUpComponent {


  isFormVisible: boolean = false;

  // mostrar el segundo form
    showNextForm() {
        this.isFormVisible = true;
    }


  // para mostrar el primer formulario
  showPreviousForm() {
    this.isFormVisible = false;
  }

}

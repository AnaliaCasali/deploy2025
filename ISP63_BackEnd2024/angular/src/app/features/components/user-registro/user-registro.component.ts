import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { RegisterRequestDTO } from '../../../../core/services/auth.models';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgModel, Validators } from '@angular/forms';
import { Genero } from '../../../modelo/enums/Genero';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { EstadoCivil } from '../../../modelo/enums/EstadoCivil';
import { Localidad } from '../../../modelo/localidad';
import { LocalidadService } from '../../../services/localidad.service';
import Swal from 'sweetalert2';
import { of } from 'rxjs';


@Component({
  selector: 'app-user-registro',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './user-registro.component.html',
  styleUrl: './user-registro.component.css'
})
export class UserRegistroComponent  implements OnInit{

  generos: Array<{ key: string; value: string }> = Object.entries(Genero).map(([key, value]) => ({ key, value }));

  listaEstadoCivil : Array<{ key: string; value: string }> = Object.entries(EstadoCivil).map(([key, value]) => ({ key, value }));
  localidades: Localidad[] = [];
  rol:string="USER"
  // Propiedades para enlazar con el formulario
  dni: string = '';
  apellido: string = '';
  nombre: string = '';
  password: string = '';
  genero: string = '';
  domicilio: string = '';
  idlocalidad: number =-1;
  telefono: string = '';
  email: string = '';
  fechaNacimiento: string = '';
  estadoCivil: string = '';
  currentStep: number = 1;

// Reactive form group

  constructor(private authService: AuthService, private localidadesService:LocalidadService,    private route: ActivatedRoute,
    private router: Router,private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.cargarLocalidades();
  }

  register() {
    const user: RegisterRequestDTO = {
      dni: this.dni,
      apellido: this.apellido,
      nombre: this.nombre,
      password: this.password,
      genero: this.genero,
      domicilio: this.domicilio,
      idLocalidad: this.idlocalidad,
      telefono: this.telefono,
      email: this.email,
      fechaNacimiento: this.fechaNacimiento,
      estadoCivil: this.estadoCivil
    };
    console.log('USUARIO' + user)
    this.authService.register(user).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se registro con éxito.Tu usuario es: IES63'+ user.dni,
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/home']); // Cambia a la ruta


      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No pudimos registrar sus datos. Inténtalo nuevamente.',
          confirmButtonText: 'OK'
        });
        console.error('Error en Registro', error);
      }
    });

  }



  isFormVisible: boolean = false;

  // mostrar el segundo form
    showNextForm() {

        this.isFormVisible = true;
    }


  // para mostrar el primer formulario
  showPreviousForm() {
    this.isFormVisible = false;
  }


  cargarLocalidades(): void {
    this.localidadesService.findAll().subscribe({
      next: (data) => {
        this.localidades = data;
      },
      error: (error) => {
        console.warn('Error al cargar localidades', error);
        return of([]);
      },
    });
  }


  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }
}

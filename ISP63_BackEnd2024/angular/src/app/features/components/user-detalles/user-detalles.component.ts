
import { UserService } from '../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Genero } from '../../../modelo/enums/Genero';
import { EstadoCivil } from '../../../modelo/enums/EstadoCivil';
import { Localidad } from '../../../modelo/localidad';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-detalles',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf,   ReactiveFormsModule],

  templateUrl: './user-detalles.component.html',
  styleUrl: './user-detalles.component.css'
})


export class UserDetallesComponent implements OnInit {
    userForm: FormGroup;
    generos = Object.values(Genero);
    estadosCiviles = Object.values(EstadoCivil);
    localidades: Localidad[] = [];

    constructor(private fb: FormBuilder, private userService: UserService) {
      this.userForm = this.fb.group({
        dni: ['', Validators.required],
        apellido: ['', Validators.required],
        nombre: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        genero: ['', Validators.required],
        domicilio: ['', Validators.required],
        localidad: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        fechaNacimiento: ['', Validators.required],
        estadoCivil: ['', Validators.required],
      });
    }

    ngOnInit(): void {
      this.loadLocalidades();
    }

    loadLocalidades(): void {
//      this.userService.getLocalidades().subscribe((data: Localidad[]) => {
  //      this.localidades = data;
    //  });
    }

    onSubmit(): void {
      if (this.userForm.valid) {
        const user = this.userForm.value;
  //      this.userService.registrarUsuario(user).subscribe(response => {
    //      console.log('Usuario registrado exitosamente', response);
      //  });
      }
    }
  }

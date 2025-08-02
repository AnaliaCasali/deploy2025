import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InfoCarrerasService } from '../../../../services/info-carreras.service';
import { Carrera } from '../../../../modelo/carreras/carrera';

@Component({
  selector: 'app-inscrip-carrera',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './inscrip-carrera.component.html',
  styleUrl: './inscrip-carrera.component.css'
})
export class InscripCarreraComponent implements OnInit {

  carreras!: Carrera[];
  alumnoForm!: FormGroup;
  academicoForm!: FormGroup;
  isForm2Visible: boolean = false;

  constructor(private fb: FormBuilder, private infoCarrerasService: InfoCarrerasService) {}

  ngOnInit(): void {

    this.infoCarrerasService.ObtenerDatos().subscribe((data: Carrera[]) => {
      this.carreras = data;
      console.log(this.carreras);
    });


    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      domicilio: ['', Validators.required],
      telefono: ['', Validators.required]
    });


    this.academicoForm = this.fb.group({
      carreras: ['', Validators.required],
      ttlSec: ['', Validators.required],
      estFonAud: ['', Validators.required],
      constVecindad: ['', Validators.required],
      partNac: ['', Validators.required]
    });
  }

  //  envío del formulario
  onSubmit() {
    if (this.alumnoForm.valid && this.academicoForm.valid) {

      const combinedData = {
        ...this.alumnoForm.value,
        ...this.academicoForm.value
      };


      console.log('Datos ingresados:', combinedData);
    }
  }

  // Mostrar el segundo formulario
  showNextForm() {
    if (this.alumnoForm.valid) {
      this.isForm2Visible = true;
    }
  }

  // Volver al formulario anterior
  showPreviousForm() {
    this.isForm2Visible = false;
  }

  // Manejar selección de archivos
  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Archivo seleccionado:', file);
  }

  // Manejar la cancelación del formulario
  onCancel() {
    this.isForm2Visible = false;
    this.alumnoForm.reset();
    this.academicoForm.reset();
  }
}

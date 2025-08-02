import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private userSvc: UserService ,    private router: Router
 ) {
    this.passwordForm = this.fb.group(
      {
        newPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordsMatch }
    );
  }

  get newPassword() {
    return this.passwordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.passwordForm.get('confirmPassword');
  }

  passwordsMatch(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  changePassword() {
    if (this.passwordForm.valid) {

      console.log("nueva pass" + this.passwordForm.controls['newPassword'].value);
      this.userSvc.ChangePassword( this.passwordForm.controls['newPassword'].value).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'La contraseña se guardó correctamente.',
          confirmButtonText: 'OK'
        });
        this.router.navigate(['/home']); // Cambia a la ruta que desees
      });
      console.log('Contraseña cambiada exitosamente');
      // Aquí puedes añadir la lógica para cambiar la contraseña
    }
  }

}

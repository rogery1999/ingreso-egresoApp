import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroForm: FormGroup = this.fb.group({
    nombre  : [ '', [ Validators.required, Validators.minLength(3) ]],
    correo  : [ '', [ Validators.required, Validators.email ]],
    password: [ '', [ Validators.required, Validators.minLength(5) ]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  registrar(){
    if( this.registroForm.invalid ){ return }
    Swal.fire({
      title: 'Espera por favor...',
      didOpen: () => {Swal.showLoading()}
    });
    const {nombre, correo, password} = this.registroForm.value;
    this.authService.registrarUsuario( nombre, correo, password )
      .then(
        credenciales => {
          Swal.close();
          this.router.navigateByUrl('/dashboard/estadistica');
        }
      )
      .catch( err => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          });
        }
      );
  }

}

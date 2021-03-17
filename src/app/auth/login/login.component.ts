import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .fa {
      color: green;
    }
  `]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    correo: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(5) ] ]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(){
    Swal.fire({
      title: 'Cargando...',
      text: 'Obteniendo credenciales',
      didOpen: () => {Swal.showLoading()}
    });
    const {correo , password} = this.loginForm.value;
    this.authService.loginUsusario( correo, password )
      .then(
        credenciales => {
          Swal.close();
          this.router.navigateByUrl('/dashboard/estadistica');
        }
      )
      .catch(
        err => {
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

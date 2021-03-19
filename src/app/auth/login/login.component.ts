import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from "../../shared/ui.actions";

import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .fa {
      color: green;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup = this.fb.group({
    correo: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(5) ] ]
  });
  cargando: boolean = false;
  uiSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.uiSubscription = this.store.select('ui').subscribe( ui => this.cargando = ui.isLoading )
  }

  login(){
    this.store.dispatch( actions.isLoading() );
    // Swal.fire({
    //   title: 'Cargando...',
    //   text: 'Obteniendo credenciales',
    //   didOpen: () => {Swal.showLoading()}
    // });
    const {correo , password} = this.loginForm.value;
    this.authService.loginUsusario( correo, password )
      .then(
        credenciales => {
          // Swal.close();
          this.store.dispatch( actions.stopLoading() );
          this.router.navigateByUrl('/dashboard/estadistica');
        }
      )
      .catch(
        err => {
          // Swal.close();
          this.store.dispatch( actions.stopLoading() );
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.message
          });
        }
      );
  }
}

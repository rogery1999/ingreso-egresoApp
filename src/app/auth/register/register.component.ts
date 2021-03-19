import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit, OnDestroy {

  registroForm: FormGroup = this.fb.group({
    nombre  : [ '', [ Validators.required, Validators.minLength(3) ]],
    correo  : [ '', [ Validators.required, Validators.email ]],
    password: [ '', [ Validators.required, Validators.minLength(5) ]]
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
    this.uiSubscription = this.store.select('ui')
      .subscribe( ui => this.cargando = ui.isLoading );
  }

  registrar(){
    if( this.registroForm.invalid ){ return }
    this.store.dispatch( actions.isLoading() );
    Swal.fire({
      title: 'Espera por favor...',
      didOpen: () => {Swal.showLoading()}
    });
    const {nombre, correo, password} = this.registroForm.value;
    this.authService.registrarUsuario( nombre, correo, password )
      .then(
        credenciales => {
          Swal.close();
          this.store.dispatch( actions.stopLoading() );
          this.router.navigateByUrl('/dashboard/estadistica');
        }
      )
      .catch( err => {
          Swal.close();
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

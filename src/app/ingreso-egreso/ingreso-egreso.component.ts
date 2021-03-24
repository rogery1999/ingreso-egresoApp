import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as actions from '../shared/ui.actions';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  tipo: string = 'ingreso';
  cargando: boolean = false;
  loadingSubscription!: Subscription;
  ingresoEgresoForm: FormGroup = this.fb.group({
    descripcion : [ '', [ Validators.required ] ],
    monto       : [ '', [ Validators.required, Validators.min(1) ] ]
  });

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private ies: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.loadingSubscription = this.store.select('ui')
      .subscribe( value => this.cargando = value.isLoading );
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  guardar(){
    if( this.ingresoEgresoForm.invalid ){ return; }
    this.store.dispatch( actions.isLoading() )
    const {monto, descripcion} = this.ingresoEgresoForm.value;
    const ingresoEgreso = new IngresoEgreso( descripcion, monto, this.tipo );
    this.ies.crearIngresoEgreso( ingresoEgreso )
      .then(
        referencia => {
          this.store.dispatch( actions.stopLoading() );
          this.ingresoEgresoForm.reset({ descripcion: '', monto: 0 });
          Swal.fire('Registro creado', descripcion, 'success');
        }
      )
      .catch( err => Swal.fire({ icon: 'error', title: 'Oops...', text: err.message }) );
  }
}

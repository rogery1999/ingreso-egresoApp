import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from "sweetalert2";
import { AppStateWithIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresosEgresosSubscription!: Subscription;
  ingresosEgresos: IngresoEgreso[] = [];

  constructor(
    private store: Store<AppStateWithIngresoEgreso>,
    private ies: IngresoEgresoService
  ) { }

  ngOnDestroy(): void {
    this.ingresosEgresosSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.ingresosEgresosSubscription = this.store.select('ingresosEgresos')
      .subscribe( ({items}) => this.ingresosEgresos = items);
  }

  borrar( uid: string ){
    this.ies.borrarIngresoEgreso( uid )
      .then(
        (_) => Swal.fire( 'Deleted!', 'Your file has been deleted.', 'success' ),
        (err) => Swal.fire( 'Error', err.message, 'error' )
      );
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { setItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  authSubscription!: Subscription
  ingresosSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private ies: IngresoEgresoService
  ) { }

  ngOnDestroy(): void {
    this.ingresosSubs.unsubscribe();
    this.authSubscription.unsubscribe();
  }

  ngOnInit(): void {

    this.authSubscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe(
        ({user}) => {
           this.ingresosSubs = this.ies.initIngresosEgresos( user!.uid )
            .subscribe( data => {
              this.store.dispatch( setItems({ items: data }) );
            })
        }
      );
  }



}

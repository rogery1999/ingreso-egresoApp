import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'estadistica',
        component: EstadisticaComponent
      },
      {
        path: 'ingreso-egreso',
        component: IngresoEgresoComponent
      },
      {
        path: 'detalle',
        component: DetalleComponent
      },
      {
        path: '**',
        redirectTo: 'estadistica'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresosEgresos: IngresoEgreso[] = [];
  cantidadIngresos: number = 0;
  montoIngresos: number = 0;
  cantidadEgresos: number = 0;
  montoEgresos: number = 0;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [[]];
  public doughnutChartType: ChartType = 'doughnut';


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresosEgresos')
      .subscribe( ({items}) => {
        this.ingresosEgresos = items;
        this.calcularDataEstadistica();

      });
  }

  calcularDataEstadistica(){
    let valIngreso = 0, valEgreso = 0, cantIngreso = 0, cantEgreso = 0;
    this.ingresosEgresos.forEach(
      item => {
        if( item.tipo === 'ingreso' ){ cantIngreso += 1; valIngreso += item.monto; }
        else{ cantEgreso += 1; valEgreso += item.monto }
      });
    this.montoIngresos = valIngreso;
    this.montoEgresos = valEgreso;
    this.cantidadIngresos = cantIngreso;
    this.cantidadEgresos = cantEgreso;
    this.doughnutChartData = [[valIngreso, valEgreso]];
  }

}

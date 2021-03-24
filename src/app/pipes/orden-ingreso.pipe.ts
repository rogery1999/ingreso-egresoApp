import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    const itemAux = items.slice(0);
    return itemAux.length <= 0 ? [] : itemAux.sort( (a,b) => a.tipo > b.tipo ? -1: 1 );
  }

}

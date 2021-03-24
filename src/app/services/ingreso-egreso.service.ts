import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AppState } from '../app.reducer';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso( ingresoEgreso: IngresoEgreso ){
    const uidUser = this.authService.user?.uid;
    delete ingresoEgreso.uid;
    return this.firestore.doc(`${ uidUser }/ingresos-egresos`)
      .collection('items')
      .add( {...ingresoEgreso} );

  }

  initIngresosEgresos(uid: string){
    return this.firestore.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map( snapshot => snapshot.map( doc => ({ uid: doc.payload.doc.id, ...doc.payload.doc.data() as any })) )
      );
  }

  borrarIngresoEgreso( uidItem: string ){
    const uidUser = this.authService.user?.uid;
    return this.firestore.doc(`${ uidUser }/ingresos-egresos/items/${ uidItem }`).delete();
  }
}

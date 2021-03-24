import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';
import { Store } from '@ngrx/store';
import * as authActions from '../auth/auth.actions';
import { of, Subscription } from 'rxjs';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user: Usuario | null = null;


  public get user() : Usuario | null {
    return {...this._user!}
  }


  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) { }

  initAuhtListener(){
    this.auth.authState.subscribe(
      fuser => {
        if( fuser ){
          this.userSubscription = this.firestore.doc<Usuario>(`${fuser.uid}/usuario`).valueChanges()
            .subscribe(
              ( usuario ) => {
                this._user = {...usuario!};
                this.store.dispatch( authActions.setUser( { user: {...usuario!} } ) );
              }
            );
        }else{
          if(this.userSubscription){
            this._user = null;
            this.userSubscription.unsubscribe();
          }
          this.store.dispatch( authActions.unSetUser() );
          this.store.dispatch( unSetItems() );
        }
      }
    );
  }

  registrarUsuario( nombre: string, correo: string, password: string ){
    return this.auth.createUserWithEmailAndPassword( correo, password )
      .then( ({user}) => {
        const newUser = new Usuario( user!.uid, user!.email!, nombre );
        return this.firestore.doc(`/${ user!.uid }/usuario`)
          .set({...newUser});
      });
  }

  loginUsusario( correo: string, password: string ){
    return this.auth.signInWithEmailAndPassword( correo, password );
  }

  logout(){
    return this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe( map( fuser => fuser != null ) );
  }
}

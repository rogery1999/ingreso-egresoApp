import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  initAuhtListener(){
    this.auth.authState.subscribe(
      fuser => {
        console.log(fuser?.uid);
        console.log(fuser?.email);
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

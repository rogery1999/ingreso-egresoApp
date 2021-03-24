import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { AppState } from '../../app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  user!: Usuario | null;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.store.select('auth')
      .pipe(
        filter( auth => auth.user != null )
      )
      .subscribe( ({user}) => this.user = user );
  }

}

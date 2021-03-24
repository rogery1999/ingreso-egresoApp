import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { filter } from 'rxjs/operators';


interface MenuItem{
  label : string;
  icon  : string;
  link  : string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
    .pointer{
      cursor: pointer;
    }
  `]
})
export class SidebarComponent implements OnInit, OnDestroy {

  options: MenuItem[] = [
    { label: 'Dashboard',           link: '/dashboard/estadistica',     icon: "menu-icon fa fa-tachometer-alt" },
    { label: 'Ingresos y Egresos',  link: '/dashboard/ingreso-egreso',  icon: "menu-icon fa fa-clipboard-list" },
    { label: 'Detalle',             link: '/dashboard/detalle',         icon: "menu-icon fa fa-table" }
  ];
  userSubs!: Subscription;
  user!: Usuario | null;

  constructor(
    private authService: AuthService,
    private router: Router,
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

  logout(){
    this.authService.logout()
      .then(
        response => {
          this.router.navigateByUrl('/login');
        }
      )
      .catch( err => console.error(err) );
  }

}

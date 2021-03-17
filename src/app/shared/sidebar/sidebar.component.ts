import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


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
export class SidebarComponent implements OnInit {

  options: MenuItem[] = [
    { label: 'Dashboard',           link: '/dashboard/estadistica',     icon: "menu-icon fa fa-tachometer-alt" },
    { label: 'Ingresos y Egresos',  link: '/dashboard/ingreso-egreso',  icon: "menu-icon fa fa-clipboard-list" },
    { label: 'Detalle',             link: '/dashboard/detalle',         icon: "menu-icon fa fa-table" }
  ]

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

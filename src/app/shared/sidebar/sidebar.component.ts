import { Component, OnInit } from '@angular/core';


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
    { label: 'Detalle',             link: '/dashboard/detalle',         icon: "menu-icon fa fa-table" },
    { label: 'Cerrar Sesión',       link: '/login',                     icon: "menu-icon fa fa-sign-out-alt" },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

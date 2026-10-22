
import { Routes } from '@angular/router';

import { Home } from './component/home/home';
import { Cliente } from './component/cliente/cliente';
import { Ventas } from './component/ventas/ventas';
import { Sucursales } from './component/sucursales/sucursales';

export const routes: Routes = [
  {
    path: 'home',
    component: Home
  },
  {
    path: 'clientes',
    component: Cliente
  },
  {
    path: 'ventas',
    component: Ventas
  },
  {
    path: 'sucursales',
    component: Sucursales
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
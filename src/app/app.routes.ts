
import { Routes } from '@angular/router';
import { Cliente } from './component/cliente/cliente';
import { Ventas } from './component/ventas/ventas';

export const routes: Routes = [
  {
    path: 'clientes',
    component: Cliente
  },
  {
    path: 'ventas',
    component: Ventas
  },
  {
    path: '',
    redirectTo: 'clientes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'clientes'
  }
];

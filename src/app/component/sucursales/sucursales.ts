
import { Component, OnInit, inject } from '@angular/core';
import {
  ServiceSucursal,
  Sucursal
} from '../../servicios/sucursal.serv/servicesucursal';

@Component({
  selector: 'app-sucursales',
  standalone: true,
  templateUrl: './sucursales.html',
  styleUrl: './sucursales.css'
})
export class Sucursales implements OnInit {

  private serviceSucursal = inject(ServiceSucursal);

  suc: Sucursal[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.serviceSucursal.getSucursales().subscribe({
      next: (datos) => {
        this.suc = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al obtener sucursales:', err);
        this.error = 'No se pudieron cargar las sucursales.';
        this.cargando = false;
      }
    });
  }
}

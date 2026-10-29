import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { Serviceclient } from '../../servicios/cliente.serv/serviceclient';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [],
  templateUrl: './cliente.html',
  styleUrl: './cliente.css'
})
export class Cliente implements OnInit {

  clientes: any[] = [];
  instancia = Math.random().toString(36).substring(2, 8);

  constructor(
    private serviceclient: Serviceclient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.serviceclient.getClientes().subscribe({
      next: (datos) => {
        this.clientes = datos;

        console.log('Clientes asignados:', this.clientes.length);

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }
}
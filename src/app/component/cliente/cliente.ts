import { Component, OnInit } from '@angular/core';
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

  constructor(private serviceclient: Serviceclient) {}

  ngOnInit(): void {

    this.serviceclient.getClientes().subscribe({
      next: (datos) => {
        this.clientes = datos;
      },
    });

  }
}

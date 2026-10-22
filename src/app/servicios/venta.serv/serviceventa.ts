
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Factura {
  NroFactura: number;
  FechaFactura: string;
  IdCliente: number;
  cliente: string;
  Importe: number;
  IVA: number;
  Estado: 'Pendiente' | 'Pagado' | 'Atrasado';
  idSucursal: number;
  sucursal: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceVenta {

  private url = 'http://localhost/ram/getfacturas.php';

  constructor(private http: HttpClient) {}

  getFacturas(): Observable<Factura[]> {
    return this.http.get<Factura[]>(this.url);
  }
}

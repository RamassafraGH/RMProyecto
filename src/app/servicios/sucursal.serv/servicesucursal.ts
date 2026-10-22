
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Sucursal {
  idSucursal: number;
  nombre: string;
  ciudad: string;
  direccion: string;
  cantempleado: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceSucursal {
  private url = 'http://localhost/ram/getsucursal.php';

  constructor(private http: HttpClient) {}

  getSucursales(): Observable<Sucursal[]> {
    return this.http.get<Sucursal[]>(this.url);
  }
}

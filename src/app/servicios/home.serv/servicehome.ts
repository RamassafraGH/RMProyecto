
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResumenHome {
  totalFacturas: number;
  totalFacturado: number;
  pendientes: number;
  pagadas: number;
  atrasadas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceHome {
  private url = 'http://localhost/ram/getresumen.php';

  constructor(private http: HttpClient) {}

  getResumen(): Observable<ResumenHome> {
    return this.http.get<ResumenHome>(this.url);
  }
}

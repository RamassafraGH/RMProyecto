import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SerClient {

  private url = 'http://localhost/api/getcliente.php';

  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get<any[]>(this.url);
  }
}

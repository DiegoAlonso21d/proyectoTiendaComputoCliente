import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  url = enviroment.apiUrl;

  
  constructor(private httpClient: HttpClient) {}

  login(data: any) {
    return this.httpClient.post(this.url + '/usuarios/login', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }

  validarToken() {
    // Configurar el encabezado con el token

    const token = localStorage.getItem('token')!;

    let params = new HttpParams().set('x-token', token);

    return this.httpClient.get(`${this.url}/dashboard/isTokenValid`, {
      params: params,
    });
  }

  checkToken() {
    return this.httpClient.get(this.url + '/usuarios/checkToken');
  }

  signup(data: any) {
    return this.httpClient.post(this.url + '/usuarios/register', data, {
      headers: new HttpHeaders().set('Conent-Type', 'application/json'),
    });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  url = enviroment.apiUrl;

  productoSeleccionado: any;

  constructor(private httpClient: HttpClient) {}

  add(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/productos/add', data, {
      headers,
    });
  }

  update(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/productos/update', data, {
      headers,
    });
  }

  updateStatus(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/productos/updateStatus', data, {
      headers,
    });
  }

  getProductos() {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(this.url + '/productos/get', { headers });
  }

  deleteProducto(producto: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(
      this.url + `/productos/delete/${producto.id}`,
      producto,
      {
        headers,
      }
    );
  }

  getProductoPorCategoria(id: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(this.url + `/productos/getByCategory/${id}`, {
      headers,
    });
  }

  getById(id: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get(this.url + `/productos/getById/ ${id}`, {
      headers,
    });
  }
}

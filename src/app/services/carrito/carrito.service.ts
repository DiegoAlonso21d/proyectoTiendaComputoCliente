import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  url = enviroment.apiUrl;

  private carrito = new BehaviorSubject<any[]>([]);
  carrito$ = this.carrito.asObservable();

  private carritoActualizado = new Subject<void>();
  carritoActualizado$ = this.carritoActualizado.asObservable();

  constructor(private httpClient: HttpClient) {
    // Obtener el carrito del localStorage al iniciar el servicio
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      this.carrito.next(JSON.parse(carritoGuardado));
    }
  }

  cantidadEnCarrito(): number {
    return this.carrito.value.length;
  }

  agregarAlCarrito(producto: any) {
    const carritoActual = this.carrito.value;
    const indice = carritoActual.findIndex((p) => p.id === producto.id);

    if (indice !== -1) {
      // El producto ya está en el carrito, incrementa la cantidad
      carritoActual[indice].cantidad += 1;
    } else {
      // El producto no está en el carrito, agrégalo con cantidad 1
      this.carrito.next([...carritoActual, { ...producto, cantidad: 1 }]);
    }
    this.carritoActualizado.next();
    // Guardar en localStorage después de cada cambio
    this.guardarCarritoEnLocalStorage();
  }

  obtenerCarrito() {
    return this.carrito;
  }

  vaciarCarrito() {
    this.carrito.next([]);
    // Guardar en localStorage después de cada cambio
    this.guardarCarritoEnLocalStorage();
  }

  actualizarCantidadEnCarrito(id: number, cantidad: number) {
    const carritoActual = this.carrito.value;
    const indice = carritoActual.findIndex((p) => p.id === id);

    if (indice !== -1) {
      // Actualizar la cantidad del producto en el carrito
      carritoActual[indice].cantidad = cantidad;
      this.carrito.next(carritoActual);

      // Emitir evento de actualización del carrito
      this.carritoActualizado.next();
    }
  }

  eliminarDelCarrito(producto: any) {
    const carritoActual = this.carrito.value;
    const nuevoCarrito = carritoActual.filter((p) => p.id !== producto.id);
    this.carrito.next(nuevoCarrito);

    // Guardar en localStorage después de cada cambio
    this.guardarCarritoEnLocalStorage();
  }

  generateReport(data: any) {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(this.url + '/facturas/generateReport', data, {
      headers,
    });
  }

  getPdf(data: any): any {
    const token = localStorage.getItem('token')!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(this.url + '/facturas/getPdf', data, {
      headers,
      responseType: 'blob',
    });
  }

  private guardarCarritoEnLocalStorage() {
    const carritoActual = this.carrito.value;
    localStorage.setItem('carrito', JSON.stringify(carritoActual));
  }
}

import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  tokenDisponible: any;

  token = localStorage.getItem('token');

  cantiddadDelCarrito: any;

  constructor(private carritoService: CarritoService) {
    this.cantidadCarrito();
    this.ifToken();
  }

  cantidadCarrito(): number {
    return this.carritoService.cantidadEnCarrito();
  }

  cerrarSesion() {
    this.tokenDisponible = false;

    localStorage.clear();
  }

  ifToken() {
    if (this.token) {
      this.tokenDisponible = true;
    } else {
      this.tokenDisponible = false;
    }
  }
}

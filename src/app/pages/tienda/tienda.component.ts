import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent {
  productos: any;

  constructor(
    private productoService: ProductosService,
    private carritoService: CarritoService,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe((response: any) => {
      console.log(response);
      this.productos = response;
    });
  }

  detalleProducto(producto: any) {
    this.productoService.productoSeleccionado = producto;
    this.router.navigate(['/detalleProducto']);
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);

    this.mostrarAlerta('Exitoso', 'Producto agregado al carrito');
  }

  mostrarAlerta(
    titulo: string,
    mensaje: string,
    tipo: 'success' | 'error' | 'warning' | 'info' = 'success'
  ) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: tipo,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    });
  }
}

import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { ProductosService } from 'src/app/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent {
  productoDetalle: any;

  cantidadProducto: any = 1;

  constructor(
    private productoService: ProductosService,
    private carritoService: CarritoService
  ) {
    this.productoDetalle = productoService.productoSeleccionado;
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarAlCarrito(producto);

    this.mostrarAlerta('Exitoso', 'Producto agregado al carrito');
  }

  actualizarCantidad(event: any) {
    // Esta función se ejecutará cada vez que cambie la cantidad en el select
    console.log(event.target.value);

    this.cantidadProducto = event.target.value;

    console.log('Nueva cantidad:', this.cantidadProducto);
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

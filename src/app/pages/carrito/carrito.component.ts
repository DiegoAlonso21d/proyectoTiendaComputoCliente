import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarritoService } from 'src/app/services/carrito/carrito.service';
import { SnackbarService } from 'src/app/services/snackbard/snackbar.service';
import Swal from 'sweetalert2';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: any[] = [];
  total: any = 0;

  mostrarModal: boolean = false;

  manageOrderForm: any = FormGroup;

  constructor(
    private carritoService: CarritoService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) {
    this.addManageOrder();
  }

  addManageOrder() {
    this.manageOrderForm = this.formBuilder.group({
      nombre: [null, [Validators.required]],
      email: [null, [Validators.required]],
      telefono: [null, [Validators.required]],

      metodoPago: [null, [Validators.required]],
      total: [this.total, [Validators.required]],
      detalleProducto: [this.carrito, [Validators.required]],
    });
  }

  ngOnInit() {
    this.carritoService.obtenerCarrito().subscribe((carrito) => {
      this.carrito = carrito;
      this.calcularTotal();
      console.log(this.carrito);
    });
  }

  validateSubmit() {
    if (!this.manageOrderForm.get('nombre').value) {
      this.showAlert('El campo Nombre no debe estar vacío');
      return;
    }
    if (!this.manageOrderForm.get('email').value) {
      this.showAlert('El campo Email no debe estar vacío');
      return;
    }

    if (!this.manageOrderForm.get('telefono').value) {
      this.showAlert('El campo Telefono no debe estar vacío');
      return;
    }

    if (!this.manageOrderForm.get('metodoPago').value) {
      this.showAlert('El campo Descripción no debe estar vacío');
      return;
    }
    Swal.fire({
      title: '¿Está seguro de confirmar la compra?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        // El usuario confirmó, ejecutar la acción de envío
        this.submitAction();
      }
    });
  }
  submitAction() {
    var formData = this.manageOrderForm.value;
    var data = {
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      metodoPago: formData.metodoPago,
      total: this.total,
      detalleProducto: JSON.stringify(this.carrito),
    };

    this.carritoService.generateReport(data).subscribe((response: any) => {
      this.snackbarService.showSnackbar(
        'Factura creada correctamente',
        'Exito'
      );

      this.downloadFile(response?.uuid);
      this.manageOrderForm.reset();
      this.total = 0;
    });
  }

  downloadFile(fileName: string) {
    var data = {
      uuid: fileName,
    };

    this.carritoService.getPdf(data).subscribe((response: any) => {
      saveAs(response, fileName + '.pdf');
    });
  }

  eliminarDelCarrito(producto: any) {
    this.carritoService.eliminarDelCarrito(producto);
  }

  actualizarCantidad(carro: any, cantidad: number) {
    const nuevaCantidad = carro.cantidad + cantidad;

    // Validar que la nueva cantidad no sea menor que 1
    if (nuevaCantidad >= 1) {
      this.carritoService.actualizarCantidadEnCarrito(carro.id, nuevaCantidad);
    }
  }
  obtenerCarrito() {
    this.carritoService.carrito$.subscribe((carrito) => {
      this.carrito = carrito;
      this.calcularTotal();
    });
  }
  calcularTotal() {
    this.total = this.carrito.reduce(
      (sum, carro) => sum + carro.cantidad * carro.precio,
      0
    );
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();

    this.mostrarAlerta('Exito', 'Carrito removido');
  }

  openDetalleModal(carrito: any) {
    this.mostrarModal = true;
    console.log(carrito);

    this.carrito = JSON.parse(carrito);
  }
  closeModal() {
    this.mostrarModal = false;
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

  showAlert(message: string) {
    // Puedes usar cualquier librería de alertas que desees, como SweetAlert2 o Toastr
    // Aquí hay un ejemplo de cómo usar SweetAlert2
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }
}

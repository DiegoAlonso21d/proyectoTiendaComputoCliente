import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CarritoComponent, TiendaComponent, DetalleProductoComponent],
  exports: [CarritoComponent, TiendaComponent, SharedModule],
  imports: [CommonModule, RouterModule, SharedModule, ReactiveFormsModule],
})
export class PagesModule {}

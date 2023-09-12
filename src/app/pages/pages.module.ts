import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CarritoComponent, TiendaComponent],
  exports: [CarritoComponent, TiendaComponent,SharedModule],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}

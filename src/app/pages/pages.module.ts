import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CarouselComponent } from './tienda/carousel/carousel.component';

@NgModule({
  declarations: [CarritoComponent, TiendaComponent, CarouselComponent],
  exports: [CarritoComponent, TiendaComponent,SharedModule, CarouselComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}

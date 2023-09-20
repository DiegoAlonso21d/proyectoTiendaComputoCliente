import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoComponent } from './carrito/carrito.component';
import { TiendaComponent } from './tienda/tienda.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BannerComponent } from './tienda/banner/banner.component';

@NgModule({
  declarations: [CarritoComponent, TiendaComponent, BannerComponent],
  exports: [CarritoComponent, TiendaComponent,SharedModule, BannerComponent],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class PagesModule {}

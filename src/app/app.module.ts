import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NopagefoundComponent } from './nopagefound/nopagefound.component';

import { PagesComponent } from './pages/pages.component';
import { AuthModule } from './auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [AppComponent, NopagefoundComponent, PagesComponent, CarouselComponent],
  imports: [BrowserModule, AppRoutingModule, AuthModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

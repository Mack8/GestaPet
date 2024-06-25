import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';
import { VideojuegoModule } from './videojuego/videojuego.module';
import { OrdenModule } from './orden/orden.module';

import { FacturaModule } from './factura/factura.module';
import { ReservaModule } from './reserva/reserva.module';

/* import { FacturaIndexComponent } from './factura/factura-index/factura-index.component';
import { FacturaDetailComponent } from './factura/factura-detail/factura-detail.component'; */

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    VideojuegoModule,
    OrdenModule,
    FacturaModule,
    ReservaModule,
    AppRoutingModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

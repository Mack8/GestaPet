import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { UserModule } from './user/user.module';

import { FacturaModule } from './factura/factura.module';
import { ReservaModule } from './reserva/reserva.module';

/* import { FacturaIndexComponent } from './factura/factura-index/factura-index.component';
import { FacturaDetailComponent } from './factura/factura-detail/factura-detail.component'; */

import { HttpClientModule } from '@angular/common/http';
import { ProductoModule } from './producto/producto.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './core/header/header.component';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';
import { RouterModule } from '@angular/router';
import { SucursalModule } from './sucursal/sucursal.module';
import { ServicioModule } from './servicio/servicio.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UserModule,
    ProductoModule,
    FacturaModule,
    ReservaModule,
    SucursalModule,
    ServicioModule,
    AppRoutingModule,
  
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CoreModule } from './core/core.module';
import { ShareModule } from './share/share.module';
import { HomeModule } from './home/home.module';
import { FacturaModule } from './factura/factura.module';
import { ReservaModule } from './reserva/reserva.module';

/* import { FacturaIndexComponent } from './factura/factura-index/factura-index.component';
import { FacturaDetailComponent } from './factura/factura-detail/factura-detail.component'; */

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProductoModule } from './producto/producto.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './core/header/header.component';
import { ProductoIndexComponent } from './producto/producto-index/producto-index.component';
import { RouterModule } from '@angular/router';
import { DxButtonModule } from 'devextreme-angular';
import { HorarioModule } from './horario/horario.module';
import { MatTabsModule } from '@angular/material/tabs';
import { Toast, ToastrModule } from 'ngx-toastr';
import { ServicioModule } from './servicio/servicio.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { ReportesModule } from './reportes/reportes.module';
import { CitaModule } from './cita/cita.module';
import { HttpAuthInterceptorService } from './share/http-auth-interceptor.service';
import { HttpErrorInterceptorService } from './share/http-error-interceptor.service';

import { UsuarioModule } from './usuario/usuario.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MascotaModule } from './mascota/mascota.module';

//import { NgxMaskModule, IConfig } from 'ngx-mask'

//export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    CoreModule,
    ShareModule,
    HomeModule,
    UsuarioModule,
    ProductoModule,
    FacturaModule,
    ReservaModule,
    HorarioModule,
    ServicioModule,
    SucursalModule,
    UsuarioModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    ReportesModule,
    MascotaModule,
   // NgxMaskModule.forRoot(),
   CitaModule,
   UsuarioModule,
   DxButtonModule,
    AppRoutingModule,
    
     

  ],
  providers: [
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


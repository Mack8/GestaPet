import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteServicioComponent } from './reporte-servicio/reporte-servicio.component';
import { ReporteProductoComponent } from './reporte-producto/reporte-producto.component';


@NgModule({
  declarations: [
    ReporteServicioComponent,
    ReporteProductoComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule
  ]
})
export class ReportesModule { }

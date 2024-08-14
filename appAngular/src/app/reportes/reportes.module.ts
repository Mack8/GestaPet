import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as echarts from 'echarts';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ReporteServicioComponent } from './reporte-servicio/reporte-servicio.component';
import { ReporteProductoComponent } from './reporte-producto/reporte-producto.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReporteCitasSucursalComponent } from './reporte-citas-sucursal/reporte-citas-sucursal.component';
import { ReporteCitasEstadoComponent } from './reporte-citas-estado/reporte-citas-estado.component';


@NgModule({
  declarations: [
    ReporteServicioComponent,
    ReporteProductoComponent,
    ReporteCitasSucursalComponent,
    ReporteCitasEstadoComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    NgxChartsModule,
    NgxEchartsModule.forRoot({
      echarts,
    })
  ]
})
export class ReportesModule { }

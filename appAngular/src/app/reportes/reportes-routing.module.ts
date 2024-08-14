import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteProductoComponent } from './reporte-producto/reporte-producto.component';
import { ReporteServicioComponent } from './reporte-servicio/reporte-servicio.component';
import { ReporteCitasSucursalComponent } from './reporte-citas-sucursal/reporte-citas-sucursal.component';
import { ReporteCitasEstadoComponent } from './reporte-citas-estado/reporte-citas-estado.component';

const routes: Routes = [

  {
    path:'reportProducto',
    component: ReporteProductoComponent
  },
  {
    path:'reportServicio',
    component: ReporteServicioComponent
  },
  { path: 'reporte-citas-sucursal', 
    component: ReporteCitasSucursalComponent 
  },
  { path: 'reporte-citas-estado', 
    component: ReporteCitasEstadoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

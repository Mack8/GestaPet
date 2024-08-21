import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReporteProductoComponent } from './reporte-producto/reporte-producto.component';
import { ReporteServicioComponent } from './reporte-servicio/reporte-servicio.component';
import { ReporteCitasSucursalComponent } from './reporte-citas-sucursal/reporte-citas-sucursal.component';
import { ReporteCitasEstadoComponent } from './reporte-citas-estado/reporte-citas-estado.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [

  {
    path:'reportProducto',
    component: ReporteProductoComponent,
    canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }
  },
  {
    path:'reportServicio',
    component: ReporteServicioComponent,
    canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }
  },
  { path: 'reporte-citas-sucursal', 
    component: ReporteCitasSucursalComponent,
    canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }
  },
  { path: 'reporte-citas-estado', 
    component: ReporteCitasEstadoComponent,
    canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }

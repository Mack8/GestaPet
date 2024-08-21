import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaIndexComponent } from './factura-index/factura-index.component';
import { FacturaCreateComponent } from './factura-create/factura-create.component';
import { FacturaTableComponent } from './factura-table/factura-table.component';
import { FacturasClienteComponent } from './facturas-cliente/facturas-cliente.component';
import { authGuard } from '../share/auth.guard';

const routes: Routes = [
  {path:'factura',component: FacturaIndexComponent, canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }},
  {path:'factura/create',component: FacturaCreateComponent, canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }},
  { path: 'factura/update/:id', component: FacturaCreateComponent, canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }},
  {path:'factura/proforma',component: FacturaTableComponent, canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }},
  {path:'factura/cliente',component: FacturasClienteComponent, canActivate: [authGuard], data: { roles: ['CLIENTE'] }},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }

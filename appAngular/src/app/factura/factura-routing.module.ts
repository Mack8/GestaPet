import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaIndexComponent } from './factura-index/factura-index.component';
import { FacturaCreateComponent } from './factura-create/factura-create.component';
import { FacturaTableComponent } from './factura-table/factura-table.component';

const routes: Routes = [
  {path:'factura',component: FacturaIndexComponent},
  {path:'factura/create',component: FacturaCreateComponent},
  { path: 'factura/update/:id', component: FacturaCreateComponent },
  {path:'factura/proforma',component: FacturaTableComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaIndexComponent } from './factura-index/factura-index.component';
import { FacturaCreateComponent } from './factura-create/factura-create.component';

const routes: Routes = [
  {path:'factura',component: FacturaIndexComponent},
  {path:'factura/create',component: FacturaCreateComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }

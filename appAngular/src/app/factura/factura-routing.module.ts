import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacturaIndexComponent } from './factura-index/factura-index.component';

const routes: Routes = [
  {path:'factura',component: FacturaIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalIndexComponent } from './sucursal-index/sucursal-index.component';
import { SucursalAllComponent } from './sucursal-all/sucursal-all.component';

const routes: Routes = [

  {path:'sucursal',component: SucursalIndexComponent},
  {path:'sucursal-table',component: SucursalAllComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }

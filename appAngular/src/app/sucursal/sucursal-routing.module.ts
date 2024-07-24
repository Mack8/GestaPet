import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SucursalIndexComponent } from './sucursal-index/sucursal-index.component';
import { SucursalAllComponent } from './sucursal-all/sucursal-all.component';
import { SucursalFormComponent } from './sucursal-form/sucursal-form.component';
import { SucursalDetailComponent } from './sucursal-detail/sucursal-detail.component';

const routes: Routes = [

  {path:'sucursal',component: SucursalIndexComponent},
  {path:'sucursal-table',component: SucursalAllComponent},
  { path: 'sucursal/create', component: SucursalFormComponent },
  { path: 'sucursal/update/:id', component: SucursalFormComponent },
  {path:'sucursal/:id',component: SucursalDetailComponent},



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SucursalRoutingModule { }

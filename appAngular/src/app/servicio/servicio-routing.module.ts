import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioAllComponent } from './servicio-all/servicio-all.component';

const routes: Routes = [
  
  {path:'servicio-table',component: ServicioAllComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }

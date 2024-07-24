import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioAllComponent } from './servicio-all/servicio-all.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';
import { ServicioDetailComponent } from './servicio-detail/servicio-detail.component';

const routes: Routes = [
  
  {path:'servicio-table',component: ServicioAllComponent},
  {path:'servicio/create',component: ServicioFormComponent},
  {path:'servicio/update/:id',component: ServicioFormComponent},
  {path:'servicio/:id',component: ServicioDetailComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }

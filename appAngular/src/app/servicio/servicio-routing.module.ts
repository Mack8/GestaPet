import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServicioAllComponent } from './servicio-all/servicio-all.component';
import { ServicioFormComponent } from './servicio-form/servicio-form.component';
import { ServicioDetailComponent } from './servicio-detail/servicio-detail.component';
import { authGuard } from '../share/auth.guard';
import { ServicioCatalogoComponent } from './servicio-catalogo/servicio-catalogo.component';

const routes: Routes = [
  
  {path:'servicio-table',component: ServicioAllComponent},
  {path:'servicio/create',component: ServicioFormComponent, canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }},
  {path:'servicio/update/:id',component: ServicioFormComponent, canActivate: [authGuard], data: { roles: ['ADMINISTRADOR', 'ENCARGADO'] }},
  {path:'servicio/:id',component: ServicioDetailComponent},
  {path:'servicio-catalogo',component: ServicioCatalogoComponent},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicioRoutingModule { }

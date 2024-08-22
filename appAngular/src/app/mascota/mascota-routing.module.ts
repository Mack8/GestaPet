import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../share/auth.guard';
import { MascotaFormComponent } from './mascota-form/mascota-form.component';

const routes: Routes = [

  { path: 'mascota/create', component: MascotaFormComponent, canActivate: [authGuard], data: { roles: ['CLIENTE',] }},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MascotaRoutingModule { }

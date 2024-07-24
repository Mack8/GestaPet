import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioIndexComponent } from './horario-index/horario-index.component';
//import { HorarioFormComponent } from './horario-form/horario-form.component';

const routes: Routes = [
  {path:'horario',component: HorarioIndexComponent},
  //{path:'horario/create:id/tipo', component: HorarioFormComponent },
  //{path:'horario/update/:id/tipo', component: HorarioFormComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }

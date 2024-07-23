import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorarioIndexComponent } from './horario-index/horario-index.component';

const routes: Routes = [
  {path:'horario',component: HorarioIndexComponent},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HorarioRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservaIndexComponent } from './reserva-index/reserva-index.component';

const routes: Routes = [
  {path:'reserva',component: ReservaIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }

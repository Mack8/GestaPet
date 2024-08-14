import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendarIndexComponent } from './agendar-index/agendar-index.component';

const routes: Routes = [
  {path:'agendar',component: AgendarIndexComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitaRoutingModule { }

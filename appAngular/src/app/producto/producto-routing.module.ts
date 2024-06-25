import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';

const routes: Routes = [

  {path:'producto',component: ProductoIndexComponent},
  {path:'producto/:id',component: ProductoDetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoIndexComponent } from './producto-index/producto-index.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoAllComponent } from './producto-all/producto-all.component';
import { ProductoFormComponent } from './producto-form/producto-form.component';
import { ProductoFormCreateComponent } from './producto-form-create/producto-form-create.component';

const routes: Routes = [
  { path: 'producto', component: ProductoIndexComponent },
  { path: 'producto/:id', component: ProductoDetailComponent },
  { path: 'producto-table', component: ProductoAllComponent },
  { path: 'producto/create/create', component: ProductoFormComponent },
  { path: 'producto/update/:id', component: ProductoFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}

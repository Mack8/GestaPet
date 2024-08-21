import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioLoginComponent } from './usuario-login/usuario-login.component';
import { UsuarioIndexComponent } from './usuario-index/usuario-index.component';

const routes: Routes = [  {
  path: 'usuario',
  component: UsuarioIndexComponent,
  children: [
    { path: 'registrar', component: UsuarioCreateComponent },
    { path: 'login', component: UsuarioLoginComponent },
  ],
},
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})

export class UsuarioRoutingModule { }

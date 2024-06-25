import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideojuegoRoutingModule } from './videojuego-routing.module';
import { VideojuegoDiagComponent } from './videojuego-diag/videojuego-diag.component';


@NgModule({
  declarations: [
    VideojuegoDiagComponent
  ],
  imports: [
    CommonModule,
    VideojuegoRoutingModule
  ]
})
export class VideojuegoModule { }

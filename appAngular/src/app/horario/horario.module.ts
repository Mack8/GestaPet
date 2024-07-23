import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorarioRoutingModule } from './horario-routing.module';

import { MatDividerModule } from '@angular/material/divider';
import {
  MatCell,
  MatColumnDef,
  MatHeaderCell,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule,
} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';

import { HorarioIndexComponent } from './horario-index/horario-index.component';
import { HorarioDiagComponent } from './horario-diag/horario-diag.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HorarioDetailDiagComponent } from './horario-detail-diag/horario-detail-diag.component';

@NgModule({
  declarations: [HorarioIndexComponent, HorarioDiagComponent, HorarioDetailDiagComponent],
  imports: [
    CommonModule,
    HorarioRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatChipsModule,
    MatBadgeModule,
    FormsModule,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatRow,
    MatRowDef,
    MatTabsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
})
export class HorarioModule {}

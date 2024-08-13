import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { DxButtonModule, DxTemplateModule } from 'devextreme-angular';
import { DxSchedulerModule } from 'devextreme-angular';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';

import { CitaRoutingModule } from './cita-routing.module';
import { AgendarIndexComponent, ApplyPipe } from './agendar-index/agendar-index.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


registerLocaleData(localeEs);


@NgModule({
  declarations: [
    AgendarIndexComponent,ApplyPipe
  ],
  imports: [
    CommonModule,
    CitaRoutingModule,
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
    MatHeaderCell,
    ReactiveFormsModule,
    DxButtonModule,
    DxSchedulerModule,
    DxTemplateModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // Configura el idioma
  ],
  bootstrap: [AgendarIndexComponent]
})
export class CitaModule { }

platformBrowserDynamic().bootstrapModule( CitaModule);

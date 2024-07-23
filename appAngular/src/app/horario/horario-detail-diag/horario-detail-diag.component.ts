import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-horario-detail-diag',
  templateUrl: './horario-detail-diag.component.html',
  styleUrl: './horario-detail-diag.component.css',
})
export class HorarioDetailDiagComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  id: number;
  horario: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<HorarioDetailDiagComponent>,
    private gService: GenericService
  ) {
    this.id = data.id;
    this.getHorario(data.id);
  }

  getHorario(id: any) {
    this.gService
      .get('horario/', id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.horario = data;
      });
  }

  formateTime(date) {
    var hora = date.substring(11, 13);
    var minutos = date.substring(14, 16);
    return hora + ':' + minutos;
  }
}

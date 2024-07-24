import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericService } from '../../share/generic.service';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-horario-diag',
  templateUrl: './horario-diag.component.html',
  styleUrl: './horario-diag.component.css',
})
export class HorarioDiagComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  id: number;
  tipo: string;
  datosDialog: any;
  horarioForm: FormGroup;
  titulo: string;
  allHoarios: any;
  respHorario: any;
  idSucursal: number;
  horarioInfo: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef: MatDialogRef<HorarioDiagComponent>,
    private gService: GenericService,
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private noti: NotificacionService
  ) {
    this.id = data.id;
    this.tipo = data.tipo;
    this.idSucursal = data.idSucursal;
    this.formularioReactive();
    this.getAllHorarios();
  }

  formularioReactive() {
    let number2decimals = /^[0-9]+[.,]{1,1}[0-9]{2,2}$/;
    let fechaPattern =
      /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    let horaPattern = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    this.horarioForm = this.fb.group({
      id: [this.id, null],
      idSucursal: [this.idSucursal, null],
      finicio: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(fechaPattern),
        ]),
      ],
      ffin: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(fechaPattern),
        ]),
      ],
      hinicio: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(horaPattern),
        ]),
      ],
      hfin: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern(horaPattern),
        ]),
      ],
      motivo: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.titulo =
      (this.id == 0 ? 'Crear ' : 'Editar ') +
      (this.tipo == 'SERVICIO' ? 'Horario' : 'Bloqueo');

    this.activeRouter.params.subscribe((params: Params) => {
      if (this.id != 0) {
        this.gService
          .get('horario', this.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            console.log('🚀 ~ HorarioDiagComponent ~ .subscribe ~ data:', data);
            this.horarioInfo = data;

            this.horarioForm.patchValue({
              id: this.horarioInfo.id,
              finicio: this.formateDate(new Date(this.horarioInfo.fechaInicio)),
              ffin: this.formateDate(new Date(this.horarioInfo.fechaFin)),
              hinicio: this.formateTime(this.horarioInfo.horaInicio),
              hfin: this.formateTime(this.horarioInfo.horaFin),
              tipo: this.horarioInfo.tipo,
              idSucursal: this.horarioInfo.sucursalId,
              motivo: this.horarioInfo.motivo,
            });
          });
      }
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.horarioForm.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {
        if (
          control &&
          control.errors[message.forValidator] &&
          message.forControl == controlName
        ) {
          messageError = message.text;
        }
      }
      return messageError;
    } else {
      return false;
    }
  };

  submitHorario(): void {
    if (this.horarioForm.invalid) {
      return;
    }

    var date, finicio, ffin, hinicio, hfin, mes, dia, anio, hora, minutos;

    date = this.horarioForm.get('finicio').value;
    [mes, dia, anio] = date.split('/');
    finicio = new Date(dia + '-' + mes + '-' + anio);
    this.horarioForm.value.finicio = finicio;

    date = this.horarioForm.get('ffin').value;
    [mes, dia, anio] = date.split('/');
    ffin = new Date(dia + '-' + mes + '-' + anio);
    this.horarioForm.value.ffin = ffin;

    date = this.horarioForm.get('hinicio').value;
    [hora, minutos] = date.split(':');
    hinicio = new Date('1970-01-01T' + hora + ':' + minutos + ':00' + 'Z');
    this.horarioForm.value.hinicio = hinicio;

    date = this.horarioForm.get('hfin').value;
    [hora, minutos] = date.split(':');
    hfin = new Date('1970-01-01T' + hora + ':' + minutos + ':00' + 'Z');
    this.horarioForm.value.hfin = hfin;

    this.horarioForm.value.tipo = this.tipo;

    console.log(
      '🚀 ~ HorarioDiagComponent ~ submitHorario ~ this.allHoarios.length:',
      this.allHoarios.length
    );

    if (this.allHoarios.length != 0) {
      this.allHoarios.forEach((element) => {
        if (
          new Date(element.fechaInicio) >= finicio &&
          new Date(element.fechaFin) <= ffin &&
          new Date(element.horaInicio) >= hinicio &&
          new Date(element.horaFin) <= hfin
        ) {
          if (element.id != this.id) {
            this.noti.mensajeTime(
              'Atención',
              'Ya existe un ' +
                element.tipo +
                ' en ese rango de fechas y horas.',
              3000,
              TipoMessage.warning
            );
            return;
          }
        }
      });
    }

    this.guardarHoario();
  }

  getAllHorarios() {
    this.gService
      .get('horario/sucursal', this.idSucursal)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('🚀 ~ HorarioDiagComponent ~ .subscribe ~ data:', data);
        this.allHoarios = data;
      });
  }

  guardarHoario() {
    if (this.id == 0) {
      this.gService
        .create('horario', this.horarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log("🚀 ~ HorarioDiagComponent ~ .subscribe ~ data:", data)
          this.respHorario = data;
         
          if (this.tipo == 'SERVICIO') {
            this.gService.actualizarArrayHorario(data);
          } else {
            this.gService.actualizarArrayBloque(data);
          }

        });

        this.noti.mensajeTime(
          'Éxito',
          (this.tipo == 'SERVICIO' ? 'Horario' : 'Bloqueo') +
            ' guardado con éxito',
          3000,
          TipoMessage.success
        );

        this.dialogRef.close();

        this.router.navigate(['/horario']);

    } else {
      this.gService
        .update('horario', this.horarioForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          console.log("🚀 ~ HorarioDiagComponent ~ .subscribe ~ data:", data)
          this.respHorario = data;

          if (this.tipo == 'SERVICIO') {
            this.gService.actualizarArrayHorario(data);
          } else {
            this.gService.actualizarArrayBloque(data);
          }
         
        });

        this.noti.mensajeTime(
          'Éxito',
          (this.tipo == 'SERVICIO' ? 'Horario' : 'Bloqueo') +
            ' actualizado con éxito',
          3000,
          TipoMessage.success
        );

        this.dialogRef.close();

        this.router.navigate(['/horario']);
    }
  }

  formateDate(date) {
    var dia = date.getDate();
    var mes = date.getMonth() + 1;
    var anio = date.getFullYear();
    return (
      (dia < 10 ? '0' + dia : dia) +
      '/' +
      (mes < 10 ? '0' + mes : mes) +
      '/' +
      anio
    );
  }

  formateTime(date) {
    var hora = date.substring(11, 13);
    var minutos = date.substring(14, 16);
    return hora + ':' + minutos;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Desinscribirse
    this.destroy$.unsubscribe();
  }
}

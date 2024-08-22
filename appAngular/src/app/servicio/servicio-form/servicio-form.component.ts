import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-servicio-form',
  templateUrl: './servicio-form.component.html',
  styleUrl: './servicio-form.component.css'
})
export class ServicioFormComponent {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  servicioInfo: any;
  respServicio: any;
  servicioForm: FormGroup;
  idServicio: number = 0;
  isCreate: boolean = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idServicio = params['id'];
      if (this.idServicio != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService
          .get('servicio', this.idServicio)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.servicioInfo = data;
            this.servicioForm.patchValue({
              id: this.servicioInfo.id,
              nombre: this.servicioInfo.nombre,
              descripcion: this.servicioInfo.descripcion,
              precio: this.servicioInfo.precio,
              duracion: this.servicioInfo.duracion,
              categoriaServicio: this.servicioInfo.categoriaServicio,
              disponibilidad: this.servicioInfo.disponibilidad ? '1' : '0'
            });
          });
      }
    });
  }

  formularioReactive() {
    let number2decimals = /^[0-9]+[.,]{1,1}[0-9]{2,2}$/;
    let durationPattern = /^(\d{1,2}h\s\d{1,2}m|\d{1,2}h|\d{1,3}m)$/;
    this.servicioForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      descripcion: [null, Validators.required],
      precio: [
        null,
        Validators.compose([Validators.required, Validators.pattern(number2decimals)])
      ],
      duracion: [
        null,
        Validators.compose([Validators.required, Validators.pattern(durationPattern)])
      ],
      categoriaServicio: [null, Validators.required],
      disponibilidad: ['1', Validators.required] // Default to '1' for available
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.servicioForm.get(controlName);
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

  submitServicio(): void {
    if (this.servicioForm.invalid) {
      return;
    }

    console.log(this.servicioForm.value);
    this.guardarServicio();
  }


  convertirADuracionEnMinutos(duracion: string): number {
    let minutos = 0;
  
    if (duracion.includes('h')) {
      const partes = duracion.split(' ');
      partes.forEach(parte => {
        if (parte.includes('h')) {
          minutos += parseInt(parte.replace('h', '')) * 60;
        }
        if (parte.includes('m')) {
          minutos += parseInt(parte.replace('m', ''));
        }
      });
    } else if (duracion.includes('m')) {
      minutos = parseInt(duracion.replace('m', ''));
    }
  
    return minutos;
  }


  

  guardarServicio() {
    const formValue = this.servicioForm.value;
    formValue.disponibilidad = formValue.disponibilidad === '1' ? true : false;
    formValue.duracion = this.convertirADuracionEnMinutos(formValue.duracion);
    if (this.isCreate) {
      this.gService
        .create('servicio/', formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respServicio = data;
          this.noti.mensajeRedirect(
            'Crear Servicio',
            `Servicio creado: ${data.nombre}`,
            TipoMessage.success,
            'service-table'
          );
          this.router.navigate(['/servicio-table']);
        });
    } else {
      this.gService
        .update('servicio', formValue)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respServicio = data;
          this.noti.mensajeRedirect(
            'Actualizar Servicio',
            `Servicio actualizado: ${data.nombre}`,
            TipoMessage.success,
            'service-table'
          );
          this.router.navigate(['/servicio-table']);
        });
    }
  }

  onReset() {
    this.servicioForm.reset();
  }

  onBack() {
    this.router.navigate(['/servicio-table']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
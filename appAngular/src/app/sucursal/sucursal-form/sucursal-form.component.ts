import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormErrorMessage } from '../../form-error-message';

@Component({
  selector: 'app-sucursal-form',
  templateUrl: './sucursal-form.component.html',
  styleUrls: ['./sucursal-form.component.css']
})
export class SucursalFormComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  sucursalForm: FormGroup;
  idSucursal: number | null = null;
  isCreate: boolean = true;
  encargadosList: any[] = []; // Lista completa de encargados disponibles
  encargadosSeleccionados: number[] = []; // IDs de encargados seleccionados

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
      this.idSucursal = params['id'];
      if (this.idSucursal) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.loadSucursalData(this.idSucursal);
      } else {
        this.loadEncargados();
      }
    });
  }

  formularioReactive() {
    this.sucursalForm = this.fb.group({
      id: [null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      descripcion: [null, Validators.required],
      telefono: [
        null,
        Validators.compose([Validators.required, Validators.pattern(/^\d+$/)])
      ],
      direccion: [null, Validators.required],
      correoElectronico: [
        null,
        Validators.compose([Validators.required, Validators.email])
      ],
      encargados: [[], Validators.required] // Lista de IDs de encargados seleccionados
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.sucursalForm.get(controlName);
    if (control.errors) {
      for (const message of FormErrorMessage) {
        if (
          control &&
          control.errors[message.forValidator] &&
          message.forControl === controlName
        ) {
          messageError = message.text;
        }
      }
      return messageError;
    } else {
      return false;
    }
  };

  submitSucursal(): void {
    if (this.sucursalForm.invalid) {
      return;
    }

    if (this.isCreate) {
      this.gService.create('sucursal', this.sucursalForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.noti.mensajeRedirect(
              'Crear Sucursal',
              `Sucursal creada: ${data.nombre}`,
              TipoMessage.success,
              'sucursal-table'
            );
            this.router.navigate(['/sucursal-table']);
          },
          error: (err) => {
            console.error('Error creating sucursal', err);
            this.noti.mensaje('Error', 'No se pudo crear la sucursal', TipoMessage.error);
          }
        });
    } else {
      this.gService.update(`sucursal/`, this.sucursalForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: any) => {
            this.noti.mensajeRedirect(
              'Actualizar Sucursal',
              `Sucursal actualizada: ${data.nombre}`,
              TipoMessage.success,
              'sucursal-table'
            );
            this.router.navigate(['/sucursal-table']);
          },
          error: (err) => {
            console.error('Error updating sucursal', err);
            this.noti.mensaje('Error', 'No se pudo actualizar la sucursal', TipoMessage.error);
          }
        });
    }
  }

  onReset() {
    this.sucursalForm.reset();
  }

  private loadEncargados() {
    this.gService.list('usuario/encargados') // Endpoint para obtener todos los encargados disponibles
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Encargados recibidos:', data);
          this.encargadosList = data;
        },
        error: (err) => {
          console.error('Error loading encargados', err);
          this.noti.mensaje('Error', 'No se pudieron cargar los encargados', TipoMessage.error);
        }
      });
  }

  private loadSucursalData(id: number) {
    this.gService.get(`sucursal/`, id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          console.log('Sucursal data recibida:', data);
          const { sucursal, encargados } = data;
          this.encargadosSeleccionados = sucursal.usuarios ? sucursal.usuarios.map((e: any) => e.id) : [];
          this.encargadosList = encargados;

          this.sucursalForm.patchValue({
            id: sucursal.id,
            nombre: sucursal.nombre,
            descripcion: sucursal.descripcion,
            telefono: sucursal.telefono,
            direccion: sucursal.direccion,
            correoElectronico: sucursal.correoElectronico,
            encargados: this.encargadosSeleccionados
          });
        },
        error: (err) => {
          console.error('Error loading sucursal data', err);
          this.noti.mensaje('Error', 'No se pudo cargar la sucursal', TipoMessage.error);
        }
      });
  }

  onBack() {
    this.router.navigate(['/sucursal-table']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

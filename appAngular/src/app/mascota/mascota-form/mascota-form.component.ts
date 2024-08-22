import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GenericService } from '../../share/generic.service';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrl: './mascota-form.component.css'
})
export class MascotaFormComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear Mascota';
  mascotaForm: FormGroup;
  propietarios: any[];
  mascotaId: number = 0;
  isCreate: boolean = true;
  currentUser : any

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService,
    private authService: AuthenticationService
  ) {
    this.formularioReactive();
    this.authService.decodeToken.subscribe((user:any) => ( this.currentUser = user ));
  }

  ngOnInit(): void {
    this.listPropietario();

    this.route.params.subscribe((params: Params) => {
      this.mascotaId = params['id'];
      if (this.mascotaId) {
        this.isCreate = false;
        this.titleForm = 'Actualizar Mascota';
        this.loadMascota(this.mascotaId);
      }
    });
  }

  formularioReactive() {
    this.mascotaForm = this.fb.group({
      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      raza: [''],
      edad: [0, [Validators.required, Validators.min(0)]],
      propietarioId: ['', Validators.required],
      propietarioNombre: [{ value: '', disabled: true }]
    });

    this.mascotaForm.get('propietarioId').valueChanges.subscribe(propietarioId => {
      const propietario = this.propietarios.find(p => p.id === propietarioId);
      if (propietario) {
        this.mascotaForm.patchValue({
          propietarioNombre: propietario.nombre
        });
      }
    });
  }

  loadMascota(id: number): void {
    this.gService.get(`mascota/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((mascota: any) => {
        this.mascotaForm.patchValue({
          nombre: mascota.nombre,
          especie: mascota.especie,
          raza: mascota.raza,
          edad: mascota.edad,
          propietarioId: mascota.propietarioId,
          propietarioNombre: mascota.propietario.nombre
        });
      });
  }

  onSubmit(): void {
    if (this.mascotaForm.invalid) {
      return;
    }

    const mascotaData = this.mascotaForm.getRawValue();

    if (this.isCreate) {
      this.gService.create('mascota', mascotaData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.noti.mensajeRedirect(
            'Crear Mascota',
            `Mascota creada con éxito`,
            TipoMessage.success,
            'mascota-list'
          );
          this.router.navigate(['inicio']);
        }, error => {
          this.noti.mensaje('Error', 'No se pudo crear la mascota', TipoMessage.error);
        });
    } else {
      this.gService.update('mascota', { ...mascotaData, id: this.mascotaId })
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.noti.mensajeRedirect(
            'Actualizar Mascota',
            `Mascota actualizada con éxito`,
            TipoMessage.success,
            'mascota-list'
          );
          this.router.navigate(['/mascota']);
        }, error => {
          this.noti.mensaje('Error', 'No se pudo actualizar la mascota', TipoMessage.error);
        });
    }
  }

  listPropietario() {
    this.gService.get("usuario", this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.propietarios = [respuesta]; // Envolvemos la respuesta en un array para poder usar *ngFor si es necesario
        this.mascotaForm.patchValue({
          propietarioId: this.currentUser.id,
          propietarioNombre: respuesta.nombre
        });
      });
  }
  

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onReset() {
    this.mascotaForm.reset();
  }

  onBack() {
    this.router.navigate(['/inicio']);
  }
}

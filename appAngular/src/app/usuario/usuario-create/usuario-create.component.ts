import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericService } from '../../share/generic.service';
import { AuthenticationService } from '../../share/authentication.service';
import { FormErrorMessage } from '../../form-error-message';
import {
  NotificacionService,
  TipoMessage,
} from '../../share/notification.service';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrl: './usuario-create.component.css'
})
export class UsuarioCreateComponent {

  hide = true;
  usuario: any;
  formCreate: FormGroup;
  makeSubmit: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private gService: GenericService,
    private authService: AuthenticationService,
    private notificacion: NotificacionService
  ) {
    this.reactiveForm();
  }

  reactiveForm() {
    this.formCreate = this.fb.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Ejemplo de patrón para un teléfono de 10 dígitos
      correoElectronico: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]], // Ejemplo de validación para contraseña de al menos 6 caracteres
    });
  }

  ngOnInit(): void {}

  submitForm() {
    this.makeSubmit = true;
    //Validación
    if (this.formCreate.invalid) {
      return;
    }
    //Crear usuario
    this.authService.createUser(this.formCreate.value)
    .subscribe((respuesta:any)=>{
      this.notificacion.mensajeRedirect(
        'Registrar usuario',
        'Usuario Creado',
        TipoMessage.success,
        '/usuario/login'
      )
      this.router.navigate(['/usuario/login'])
    })
  }

  onReset() {
    this.formCreate.reset();
  }

  /* Manejar errores de formulario en Angular */
  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.formCreate.get(controlName);
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
}
import { Component } from '@angular/core';
import { FormErrorMessage } from '../../form-error-message';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../share/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-login',
  templateUrl: './usuario-login.component.html',
  styleUrl: './usuario-login.component.css'
})
export class UsuarioLoginComponent {
  hide=true;
  formulario: FormGroup;
  makeSubmit: boolean = false;
  infoUsuario: any;
  constructor(
    public fb: FormBuilder,
    private authService: AuthenticationService,
    private notificacion: NotificacionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reactiveForm();
  }
  // Definir el formulario con su reglas de validación
  reactiveForm() {
    this.formulario = this.fb.group({
      correoElectronico: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }
  ngOnInit(): void {
   
  }

  onReset() {
    this.formulario.reset();
  }
  submitForm() {
    this.makeSubmit=true;
    //Validación
    if(this.formulario.invalid){
     return;
    }
    //Login
    this.authService.loginUser(this.formulario.value)
    .subscribe((respuesta:any)=>{
      this.notificacion.mensajeRedirect(
        'Login',
        'Usuario identificado',
        TipoMessage.success,
        '/'
      )
      this.router.navigate(['/'])
    })
    
  }
  /* Manejar errores de formulario en Angular */

  public errorHandling = (controlName: string) => {
    let messageError=''
    const control = this.formulario.get(controlName);
    if(control.errors){
      for (const message of FormErrorMessage) {
      
        if (control &&
            control.errors[message.forValidator] &&
            message.forControl==controlName) {
              messageError = message.text;
        }
      }
      return messageError
    }else{
      return false
    }
  };
}

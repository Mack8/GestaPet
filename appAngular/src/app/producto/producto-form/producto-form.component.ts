import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { FileUploadService } from '../../share/file-upload.service';
import { FormErrorMessage } from '../../form-error-message';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear';
  productoInfo: any;
  respProducto: any;
  productoForm: FormGroup;
  idProducto: number = 0;
  isCreate: boolean = true;
  number4digits = /^\d{4}$/;
  currentFile?: File;
  message = '';
  preview = '';
  nameImage = 'image-not-found.jpg';
  imageInfos?: Observable<any>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService,
    private uploadService: FileUploadService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params: Params) => {
      this.idProducto = params['id'];
      if (this.idProducto != undefined) {
        this.isCreate = false;
        this.titleForm = 'Actualizar';
        this.gService
          .get('producto', this.idProducto)
          .pipe(takeUntil(this.destroy$))
          .subscribe((data: any) => {
            this.productoInfo = data;
            this.productoForm.patchValue({
              id: this.productoInfo.id,
              nombre: this.productoInfo.nombre,
              descripcion: this.productoInfo.descripcion,
              categoria: this.productoInfo.categoria,
              precio: this.productoInfo.precio,
              imagen: this.productoInfo.imagen,
              stock: this.productoInfo.stock,
              proveedor: this.productoInfo.proveedor
            });
            this.nameImage = this.productoInfo.imagen;
          });
      }
    });
  }

  formularioReactive() {
    let number2decimals = /^[0-9]+[.,]{1,1}[0-9]{2,2}$/;
    this.productoForm = this.fb.group({
      id: [null, null],
      nombre: [
        null,
        Validators.compose([Validators.required, Validators.minLength(2)])
      ],
      descripcion: [null, Validators.required],
      categoria: [null, Validators.required],
      precio: [
        null,
        Validators.compose([Validators.required, Validators.pattern(number2decimals)])
      ],
      imagen: [this.nameImage, Validators.required],
      stock: [null, Validators.required],
      proveedor: [null, Validators.required]
    });
  }

  public errorHandling = (controlName: string) => {
    let messageError = '';
    const control = this.productoForm.get(controlName);
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

  submitProducto(): void {
    if (this.productoForm.invalid) {
      return;
    }
    console.log(this.productoForm.value);
    if (this.upload()) {
      this.noti.mensaje('Crear Producto', 'Imagen guardada', TipoMessage.success);
    }
    this.productoForm.patchValue({
      imagen: this.nameImage
    });
    console.log(this.productoForm.value);
    this.guardarProducto();
  }

  guardarProducto() {
    if (this.isCreate) {
      this.gService
        .create('producto/', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respProducto = data;
          this.noti.mensajeRedirect(
            'Crear Producto',
            `Producto creado: ${data.nombre}`,
            TipoMessage.success,
            'producto-table'
          );
          this.router.navigate(['/producto-table']);
        });
    } else {
      this.gService
        .update('producto', this.productoForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.respProducto = data;
          this.noti.mensajeRedirect(
            'Actualizar Producto',
            `Producto actualizado: ${data.nombre}`,
            TipoMessage.success,
            'producto-table'
          );
          this.router.navigate(['/producto-table']);
        });
    }
  }

  onReset() {
    this.productoForm.reset();
  }

  onBack() {
    this.router.navigate(['/producto-table']);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  selectFile(event: any): void {
    this.message = '';
    this.preview = '';
    const selectedFiles = event.target.files;

    if (selectedFiles) {
      const file: File | null = selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;
        this.nameImage = this.currentFile.name;
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  upload(): boolean {
    if (this.currentFile) {
      this.uploadService.upload(this.currentFile).subscribe({
        next: (event: any) => {
          if (event instanceof HttpResponse) {
            this.message = event.body.message;
            this.imageInfos = this.uploadService.getFiles();
          }
          return true;
        },
        error: (err: any) => {
          console.log(err);
          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = '¡No se pudo subir la imagen!';
            this.noti.mensajeRedirect('Foto', this.message, TipoMessage.warning, 'producto-table');
          }
          return false;
        },
        complete: () => {
          this.currentFile = undefined;
        }
      });
    }
    return false;
  }
}

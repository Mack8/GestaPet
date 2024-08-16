import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { NotificacionService, TipoMessage } from '../../share/notification.service';

@Component({
  selector: 'app-factura-create',
  templateUrl: './factura-create.component.html',
  styleUrls: ['./factura-create.component.css']
})
export class FacturaCreateComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  titleForm: string = 'Crear Factura';
  facturaForm: FormGroup;
  clientes: any[];
  productos: any[];
  servicios: any[];
  sucursal: any;
  facturaId: number = 0;
  isCreate: boolean = true;
  today: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gService: GenericService,
    private noti: NotificacionService
  ) {
    this.formularioReactive();
  }

  ngOnInit(): void {
    this.listClientes();
    this.listSucursal();
    this.listProductos();
    this.listServicios();

    this.route.params.subscribe((params: Params) => {
      this.facturaId = params['id'];
      if (this.facturaId) {
        this.isCreate = false;
        this.titleForm = 'Actualizar Factura';
        this.loadFactura(this.facturaId);
      }
    });
  }

  formularioReactive() {
    this.facturaForm = this.fb.group({
      fecha: [this.today, [Validators.required, Validators.min(this.today.getTime())]],
      clienteId: ['', Validators.required],
      clienteCorreo: [{ value: '', disabled: true }],
      sucursalId: [{ value: '', disabled: true }, Validators.required],
      subtotal: [{ value: '', disabled: true }],
      impuestos: [{ value: 13, disabled: true }],
      total: [{ value: '', disabled: true }],
      detalles: this.fb.array([])
    });

    this.facturaForm.get('clienteId').valueChanges.subscribe(clienteId => {
      const cliente = this.clientes.find(c => c.id === clienteId);
      if (cliente) {
        this.facturaForm.patchValue({
          clienteCorreo: cliente.correoElectronico
        });
      }
    });

    this.detalles.valueChanges.subscribe(() => {
      this.calcularTotales();
    });
  }

  get detalles(): FormArray {
    return this.facturaForm.get('detalles') as FormArray;
  }

  addDetalle(tipo: string, detalleData: any = null): void {
    const detalleForm = this.fb.group({
      tipo: [tipo],
      productoId: [detalleData ? detalleData.productoId : null],
      servicioId: [detalleData ? detalleData.servicioId : null],
      cantidad: [detalleData ? detalleData.cantidad : 1, [Validators.required, Validators.min(1)]], // Inicia en 1, y el mínimo es 1
      precio: [{ value: detalleData ? detalleData.precio : '', disabled: true }],
      impuestoPorcentaje: [detalleData ? detalleData.impuestoPorcentaje : 13, Validators.required],
      montoImpuesto: [{ value: detalleData ? detalleData.montoImpuesto : '', disabled: true }],
      totalBruto: [{ value: detalleData ? detalleData.totalBruto : '', disabled: true }],
      totalNeto: [{ value: detalleData ? detalleData.totalNeto : '', disabled: true }]
    });
  
    // Lógica para manejar cambios en cantidad
    detalleForm.get('cantidad').valueChanges.subscribe(cantidad => {
      if (cantidad <= 0) {
        const index = this.detalles.controls.indexOf(detalleForm);
        if (index !== -1) {
          this.removeDetalle(index); // Elimina la línea si la cantidad es 0
        }
      } else {
        this.calcularTotales(); // Recalcula los totales si la cantidad es mayor a 0
      }
    });
  
    if (tipo === 'producto') {
      detalleForm.get('productoId').valueChanges.subscribe(productoId => {
        const producto = this.productos.find(p => p.id === productoId);
        if (producto) {
          detalleForm.patchValue({
            precio: producto.precio
          });
        }
      });
    } else if (tipo === 'servicio') {
      detalleForm.get('servicioId').valueChanges.subscribe(servicioId => {
        const servicio = this.servicios.find(s => s.id === servicioId);
        if (servicio) {
          detalleForm.patchValue({
            precio: servicio.precio
          });
        }
      });
    }
  
    this.detalles.push(detalleForm);
  }
  
  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
    this.calcularTotales();
  }
  

  calcularTotales(): void {
    let subtotal = 0;
    let impuestos = 0;

    this.detalles.controls.forEach(detalle => {
      const cantidad = detalle.get('cantidad').value || 0;
      const precio = detalle.get('precio').value || 0;
      const impuestoPorcentaje = detalle.get('impuestoPorcentaje').value || 0;

      const montoBruto = cantidad * precio;
      const montoImpuesto = montoBruto * (impuestoPorcentaje / 100);
      const montoNeto = montoBruto + montoImpuesto;

      subtotal += montoBruto;
      impuestos += montoImpuesto;

      detalle.patchValue({
        montoImpuesto: montoImpuesto.toFixed(2),
        totalBruto: montoBruto.toFixed(2),
        totalNeto: montoNeto.toFixed(2)
      }, { emitEvent: false });
    });

    const total = subtotal + impuestos;

    this.facturaForm.patchValue({
      subtotal: subtotal.toFixed(2),
      impuestos: impuestos.toFixed(2),
      total: total.toFixed(2)
    }, { emitEvent: false });
  }

  loadFactura(id: number): void {
    this.gService.get(`factura/${id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((factura: any) => {
        this.facturaForm.patchValue({
          fecha: new Date(),
          clienteId: factura.clienteId,
          clienteCorreo: factura.cliente.correoElectronico,
          sucursalId: factura.sucursalId,
          subtotal: factura.subtotal,
          impuestos: factura.impuestos,
          total: factura.total
        });

        factura.detalles.forEach(detalle => {
          this.addDetalle(detalle.productoId ? 'producto' : 'servicio', detalle);
        });
      });
  }

  onSubmit(): void {
    if (this.facturaForm.invalid) {
      return;
    }

    const facturaData = this.facturaForm.getRawValue();
    facturaData.subtotal = parseFloat(facturaData.subtotal);
    facturaData.impuestos = parseFloat(facturaData.impuestos);
    facturaData.total = parseFloat(facturaData.total);
    facturaData.detalles = facturaData.detalles.map(detalle => ({
      ...detalle,
      precio: parseFloat(detalle.precio),
      montoImpuesto: parseFloat(detalle.montoImpuesto),
      totalBruto: parseFloat(detalle.totalBruto),
      totalNeto: parseFloat(detalle.totalNeto)
    }));

    if (this.isCreate) {
      this.gService.create('factura', facturaData)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.noti.mensajeRedirect(
            'Crear Factura',
            `Factura creada con éxito`,
            TipoMessage.success,
            'factura-list'
          );
          this.router.navigate(['factura/create']);
        }, error => {
          this.noti.mensaje('Error', 'No se pudo crear la factura', TipoMessage.error);
        });
    } else {
      this.gService.update('factura', { ...facturaData, id: this.facturaId })
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
          this.noti.mensajeRedirect(
            'Actualizar Factura',
            `Factura actualizada con éxito`,
            TipoMessage.success,
            'factura-list'
          );
          this.router.navigate(['/factura/proformas']);
        }, error => {
          this.noti.mensaje('Error', 'No se pudo actualizar la factura', TipoMessage.error);
        });
    }
  }

  listClientes() {
    this.gService.list("usuario/factura/")
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.clientes = respuesta;
      });
  }

  listSucursal() {
    this.gService.get("sucursal/sucursal", 1)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.sucursal = respuesta;
        this.facturaForm.patchValue({
          sucursalId: this.sucursal.id
        });
      });
  }

  listProductos() {
    this.gService.list("producto")
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.productos = respuesta;
      });
  }

  listServicios() {
    this.gService.list("servicio")
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.servicios = respuesta;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onReset() {
    this.facturaForm.reset();
  }

  onBack() {
    this.router.navigate(['/facturas']);
  }
}

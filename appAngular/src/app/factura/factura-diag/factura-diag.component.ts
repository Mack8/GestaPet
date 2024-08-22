import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-factura-diag',
  templateUrl: './factura-diag.component.html',
  styleUrl: './factura-diag.component.css'
})
export class FacturaDiagComponent implements OnInit{
  lineas: string[] = ['cantidad', 'producto', 'precio', 'subtotal', 'total'];
  datos:any;
  detalles:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<FacturaDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.obtenerFactura(this.datosDialog.id);
    }
  }
  obtenerFactura(id:any){
    this.gService
    .get('factura',id)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
        this.datos=data; 
        this.detalles = data.detalles;
        
      });
  }
  close(){
    //Dentro de close ()
     //this.form.value 
    this.dialogRef.close();
  }
}

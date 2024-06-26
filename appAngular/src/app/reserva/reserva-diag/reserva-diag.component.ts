import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reserva-diag',
  templateUrl: './reserva-diag.component.html',
  styleUrl: './reserva-diag.component.css'
})
export class ReservaDiagComponent {


  datos:any;
  datosDialog:any;
  destroy$:Subject<boolean>= new Subject<boolean>();
  
  constructor(
    @Inject(MAT_DIALOG_DATA) data,
    private dialogRef:MatDialogRef<ReservaDiagComponent>,
    private gService:GenericService
  ) { 
    this.datosDialog=data;
  }

  ngOnInit(): void {
    if(this.datosDialog.id){
      this.listReservas(this.datosDialog.id);
    }
  }

  listReservas(id:any){
    this.gService.get("cita",2)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      console.log("🚀 ~ ReservaDiagComponent ~ .subscribe ~ respuesta:", respuesta)
      this.datos=respuesta;
    })
  }
  close(){
    this.dialogRef.close();
  }
  
}

import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { ReservaDiagComponent } from '../reserva-diag/reserva-diag.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reserva-index',
  templateUrl: './reserva-index.component.html',
  styleUrl: './reserva-index.component.css'
})
export class ReservaIndexComponent {
  displayedColumns: string[] = ['fecha', 'horaInicio', 'estado', 'cliente', 'actions'];
  datos:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  filtro:string=""
  filterDatos:any;
  clientes =[];
  selected =0;

  constructor(private gService: GenericService,
    private router: Router,
    private dialog:MatDialog,
    private fb: FormBuilder) {
      this.listReservas();
      this.listClientes();
  }
  
  listReservas(){
    
    this.gService.get("cita",3)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
       this.datos=respuesta
    })
  }

  listClientes() {
    this.gService
      .list('usuario/clientes')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        this.clientes = respuesta;
      });
  }

  getCitaByCliente(cliente:any){
    if (cliente ==0){
      this.listReservas();
    }else{
      this.gService.get("cita/cliente",cliente+'/'+3)
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta:any)=>{
         this.datos=respuesta
      })
    }
   
  }

  getCitaByFecha(fecha:any){
    this.gService.get("cita/fecha",fecha.value+'/'+3)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
       this.datos=respuesta
    })
   
  }
  
  
  detalle(id:number){
    const dialogConfig=new MatDialogConfig()
    dialogConfig.width='50%'
    dialogConfig.disableClose=false
    dialogConfig.data={
      id:id
    }
    //this.dialog.open(FacturaDiagComponent,dialogConfig)
  }

  detalleReserva(id: number) {
    console.log('Navigating to reserva with id:', id);
    const dialogConfig=new MatDialogConfig()
    dialogConfig.width='50%'
    dialogConfig.disableClose=false
    dialogConfig.data={
      id:id
    }
    this.dialog.open(ReservaDiagComponent,dialogConfig)
  }

}

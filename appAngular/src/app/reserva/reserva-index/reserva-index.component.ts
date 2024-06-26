import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';

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
  filterDatos:any

  constructor(private gService: GenericService,
    private router: Router,
    private dialog:MatDialog) {
      this.listReservas()
  }
  
  listReservas(){
    
    this.gService.get("cita",2)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      console.log("🚀 ~ ReservaIndexComponent ~ .subscribe ~ respuesta:", respuesta)
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
    this.router.navigate(['reserva/', id]);
  }
  

}

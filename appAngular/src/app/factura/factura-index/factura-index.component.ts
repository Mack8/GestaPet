import { Component } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FacturaDiagComponent } from '../factura-diag/factura-diag.component';

@Component({
  selector: 'app-factura-index',
  templateUrl: './factura-index.component.html',
  styleUrl: './factura-index.component.css'
})

export class FacturaIndexComponent {
  displayedColumns: string[] = ['fecha', 'id', 'estado', 'total', 'actions'];
  datos:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  filtro:string=""
  filterDatos:any

constructor(private gService: GenericService,
  private router: Router,
  private dialog:MatDialog) {
    this.listfacturas()
}

listfacturas(){
  //localhost:3000/videojuego
  this.gService.list("factura/")
  .pipe(takeUntil(this.destroy$))
  .subscribe((respuesta:any)=>{
    console.log("🚀 ~ FacturaIndexComponent ~ .subscribe ~ respuesta:", respuesta)
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
  this.dialog.open(FacturaDiagComponent,dialogConfig)
}
}

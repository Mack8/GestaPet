import { Component } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { HorarioDiagComponent } from '../horario-diag/horario-diag.component';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { HorarioDetailDiagComponent } from '../horario-detail-diag/horario-detail-diag.component';
@Component({
  selector: 'app-horario-index',
  templateUrl: './horario-index.component.html',
  styleUrl: './horario-index.component.css'
})
export class HorarioIndexComponent {
  displayedColumns: string[] = ['fecha', 'inicio', 'fin', 'actions'];
  horarios:any
  bloqueos:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  filtro:string=""
  filterDatos:any
  selected =0
  sucursales:any
  sucursales2:any
  idSucursal = 0;

constructor(private gService: GenericService,
  private router: Router,
  private dialog:MatDialog,
  private dialog2:MatDialog,
  private noti: NotificacionService,) {
   this.listSucursales()
}

listSucursales(){
  this.gService.list("sucursal/")
  .pipe(takeUntil(this.destroy$))
  .subscribe((respuesta:any)=>{
    console.log("🚀 ~ HorarioIndexComponent ~ .subscribe ~ respuesta:", respuesta)
    this.sucursales=respuesta
    this.sucursales2=respuesta
  })
}

getHorarios(id:any, tipo: string){
  this.gService
  .get('horario/sucursalTipo',id+"/"+tipo)
  .pipe(takeUntil(this.destroy$))
  .subscribe((data:any)=>{

    if(tipo=='SERVICIO'){
      this.horarios=data; 
    }else{
      this.bloqueos=data;
    }
     
    });

    this.idSucursal= id;
}

openForm(id:number, tipo:string){
  if(this.idSucursal ==0){
    this.noti.mensajeTime(
      'Atención',
      'Debe selecionar una sucursal',
      3000,
      TipoMessage.warning
    )
    return;
  }
  const dialogConfig=new MatDialogConfig()
  dialogConfig.width='50%'
  dialogConfig.disableClose=false
  dialogConfig.data={
    id:id,
    tipo:tipo,
    idSucursal: this.idSucursal
  }
  this.dialog.open(HorarioDiagComponent,dialogConfig)
}

formateTime(date) {

  var hora = date.substring(11, 13);
  var minutos = date.substring(14, 16);
  return hora + ':' + minutos;
}

detalle(id:number){
  const dialogConfig=new MatDialogConfig()
  dialogConfig.width='30%'
  dialogConfig.disableClose=false
  dialogConfig.data={
    id:id
  }
  this.dialog2.open(HorarioDetailDiagComponent,dialogConfig)
}
}

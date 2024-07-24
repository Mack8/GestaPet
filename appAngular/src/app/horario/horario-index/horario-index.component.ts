import { Component, OnDestroy, OnInit } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { HorarioDiagComponent } from '../horario-diag/horario-diag.component';
import { NotificacionService, TipoMessage } from '../../share/notification.service';
import { HorarioDetailDiagComponent } from '../horario-detail-diag/horario-detail-diag.component';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-horario-index',
  templateUrl: './horario-index.component.html',
  styleUrl: './horario-index.component.css'
})
export class HorarioIndexComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['fecha', 'inicio', 'fin', 'actions'];
  public horarios: MatTableDataSource<any>;;
  public bloqueos:  MatTableDataSource<any>;;
  destroy$: Subject<boolean>=new Subject<boolean>();
  filtro:string=""
  filterDatos:any
  selected =0;
  selected2 =0+'b';
  sucursales:any
  sucursales2:any
  idSucursal = 0;
  tipo: string;

  miArray: any[] = [];
  private arraySubscription: Subscription;
  private arraySubscriptionBloqueo: Subscription;

constructor(private gService: GenericService,
  private router: Router,
  private dialog:MatDialog,
  private dialog2:MatDialog,
  private noti: NotificacionService,
  private route:ActivatedRoute) {
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

ngOnInit(): void {

  /* this.gService.arrayHorario$.subscribe(data => {
    this.horarios = new MatTableDataSource(data);
  });

  console.log("🚀 ~ HorarioIndexComponent ~ ngOnInit ~ this.horarios:", this.horarios)

  this.gService.arrayBloqueo$.subscribe(data => {
    this.bloqueos = new MatTableDataSource(data);
  });
  
  console.log("🚀 ~ HorarioIndexComponent ~ ngOnInit ~ this.bloqueos:", this.bloqueos) */

  this.getHorarios(this.idSucursal, this.tipo);
}
  

getHorarios(id:any, tipo: string){
  console.log("🚀 ~ HorarioIndexComponent ~ getHorarios ~ id:", id)
  if(id !=0){
    if ( typeof id === "string"){
      id = parseInt(id.slice(0,-1));
      }
      console.log("🚀 ~ HorarioIndexComponent ~ getHorarios ~ id:", id)
    this.gService
    .get('horario/sucursalTipo',id+"/"+tipo)
    .pipe(takeUntil(this.destroy$))
    .subscribe((data:any)=>{
  
      if(tipo=='SERVICIO'){
        this.horarios= new MatTableDataSource(data); 
      }else{
        this.bloqueos=new MatTableDataSource(data);
      }
       
      });
  
      this.idSucursal= id;
      this.tipo= tipo;
  }
 
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

actualizar(id:number, tipo:string) {
  this.router.navigate(['/videojuego/update', id], {
    relativeTo: this.route,
  });
}

crea(id:number, tipo:string) {
  this.router.navigate(['/videojuego/create'], {
    relativeTo: this.route,
  });
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
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
    this.arraySubscription.unsubscribe();
}
}


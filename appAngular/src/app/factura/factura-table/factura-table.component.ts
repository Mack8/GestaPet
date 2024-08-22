import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FacturaDiagComponent } from '../factura-diag/factura-diag.component';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-factura-table',
  templateUrl: './factura-table.component.html',
  styleUrl: './factura-table.component.css'
})
export class FacturaTableComponent {

  displayedColumns: string[] = ['fecha', 'id', 'estado', 'total', 'actions'];
  datos:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  filtro:string=""
  filterDatos:any
  

constructor(private gService: GenericService,
  private router: Router,
  private route: ActivatedRoute,
  private dialog:MatDialog) {
    this.listfacturas()
}

listfacturas(){
  //localhost:3000/videojuego
  this.gService.list("factura/proformas")
  .pipe(takeUntil(this.destroy$))
  .subscribe((respuesta:any)=>{
       this.datos=respuesta
  })
}

actualizarProforma(id: number) {
  this.router.navigate(['/factura/update/', id], {
    relativeTo: this.route,
  });
}


}

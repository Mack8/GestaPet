import { Component, OnInit } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FacturaDiagComponent } from '../factura-diag/factura-diag.component';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-facturas-cliente',
  templateUrl: './facturas-cliente.component.html',
  styleUrls: ['./facturas-cliente.component.css']
})
export class FacturasClienteComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'id', 'estado', 'total', 'actions'];
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  filtro: string = "";
  filterDatos: any;

  constructor(
    private gService: GenericService,
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthenticationService // Añadir el servicio de autenticación
  ) {}

  ngOnInit() {
    this.listfacturas();
  }

  listfacturas() {
    this.authService.decodeToken.subscribe((user: any) => {
      if (user && user.id) {
        this.gService.get(`factura/cliente/${user.id}`)
          .pipe(takeUntil(this.destroy$))
          .subscribe((respuesta: any) => {
            this.datos = respuesta;
          });
      }
    });
  }

  detalle(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.disableClose = false;
    dialogConfig.data = {
      id: id
    };
    this.dialog.open(FacturaDiagComponent, dialogConfig);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

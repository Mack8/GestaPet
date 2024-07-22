import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GenericService } from '../../share/generic.service';
import {
  SucursalAllDataSource,
  SucursalAllItem,
} from './sucursal-all-datasource';


@Component({
  selector: 'app-sucursal-all',
  templateUrl: './sucursal-all.component.html',
  styleUrl: './sucursal-all.component.css'
})
export class SucursalAllComponent implements AfterViewInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  //@ViewChild(MatTable) table!: MatTable<VideojuegoAllItem>;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nombre', 'correo', 'acciones'];
  //Respuesta del API
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private gService: GenericService,
    private dialog:MatDialog,
    private router:Router,
    private route:ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    this.listSucursales()
    
  }
  //Listar todos los videojuegos del API
  listSucursales() {
    //localhost:3000/videojuego
    this.gService
      .list('sucursal/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((respuesta: any) => {
        console.log(respuesta);
        this.datos = respuesta;
        this.dataSource = new MatTableDataSource(this.datos);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        
      });
  }
 
  actualizarSucursal(id: number) {
    this.router.navigate(['/sucursal/update', id], {
      relativeTo: this.route,
    });
  }

  crearSucursal() {
    this.router.navigate(['/sucursal/create'], {
      relativeTo: this.route,
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}


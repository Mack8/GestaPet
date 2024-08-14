import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-reporte-citas-sucursal',
  templateUrl: './reporte-citas-sucursal.component.html',
  styleUrls: ['./reporte-citas-sucursal.component.css']
})
export class ReporteCitasSucursalComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  data: any = null;
  view: [number, number] = [800, 600];

  // Configuración del gráfico
  animations = true;
  colorScheme = 'cool';
  legend = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  yAxisLabel = "Cantidad de Citas";
  xAxisLabel = "Sucursales";
  legendTitle = 'Sucursales';

  constructor(private gService: GenericService) {}

  ngOnInit() {
    this.listaCitasPorSucursal();
  }

  listaCitasPorSucursal() {
    this.gService.list('reporte/reporte/citas-por-sucursal-hoy')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.data = data.map(item => ({
            name: item.sucursal || 'Sin nombre',
            value: item.cantidad_citas || 0
          }));
        },
        (error) => {
          console.error('Error al obtener los datos: ', error);
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}

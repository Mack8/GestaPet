import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-reporte-citas-estado',
  templateUrl: './reporte-citas-estado.component.html',
  styleUrls: ['./reporte-citas-estado.component.css']
})
export class ReporteCitasEstadoComponent implements OnInit, OnDestroy {

  private destroy$: Subject<boolean> = new Subject<boolean>();
  data: any = null;
  view: [number, number] = [800, 400];

  // Configuración del gráfico
  animations = true;
  colorScheme = 'cool';
  legend = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  yAxisLabel = "Cantidad de Citas";
  xAxisLabel = "Estados";
  legendTitle = 'Estados de Citas';

  constructor(private gService: GenericService) {}

  ngOnInit() {
    this.getCitasPorEstado();
  }

  getCitasPorEstado() {
    this.gService.get('reporte/reporte/citas-por-estado-sucursal',3)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.data = data.map(item => ({
            name: item.estado || 'Sin estado',
            value: item.cantidad || 0
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
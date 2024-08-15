import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-reporte-servicio',
  templateUrl: './reporte-servicio.component.html',
  styleUrl: './reporte-servicio.component.css'
})
export class ReporteServicioComponent {

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
  yAxisLabel = "Cantidad Vendida";
  legendTitle = 'Servicios';

  constructor(private gService: GenericService) {}

  ngOnInit() {
    this.listaTopServiciosVendidos();
  }

  listaTopServiciosVendidos() {
    this.gService.list('reporte/reporte/top-servicios-vendidos')
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.data = data.map(item => ({
            name: item.servicio || 'Sin nombre',
            value: item.total_vendido || 0
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
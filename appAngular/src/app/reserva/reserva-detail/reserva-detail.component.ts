import { Component } from '@angular/core';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reserva-detail',
  templateUrl: './reserva-detail.component.html',
  styleUrl: './reserva-detail.component.css'
})
export class ReservaDetailComponent {

  reserva: any;
  destroy$: Subject<boolean>=new Subject<boolean>();

  constructor(private gService: GenericService,
    private router: Router
  ) {
    this.listReservas()
  }


  listReservas(){
    
    this.gService.get("cita",2)
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      
      this.reserva=respuesta;
    })
  }

  detalle(id:number){
    this.router.navigate(['/reserva',id])
  }


}

import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servicio-detail',
  templateUrl: './servicio-detail.component.html',
  styleUrl: './servicio-detail.component.css'
})
export class ServicioDetailComponent {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private route:ActivatedRoute
  ) {
    let id=this.route.snapshot.paramMap.get('id')
    if(!isNaN(Number(id))) 
      this.obtenerServicio(Number(id))
  }

  obtenerServicio(id:any){ 
    this.gService 
    .get('servicio',id) 
    .pipe(takeUntil(this.destroy$)) 
    .subscribe((data:any)=>{ 
      console.log(data); 
        this.datos=data;  
    }); 
    
  } 
  ngOnDestroy() { 
    this.destroy$.next(true); 
    this.destroy$.unsubscribe(); 
} 


}

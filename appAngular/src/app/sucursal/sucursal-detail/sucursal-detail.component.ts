import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-sucursal-detail',
  templateUrl: './sucursal-detail.component.html',
  styleUrl: './sucursal-detail.component.css'
})
export class SucursalDetailComponent {
  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private route:ActivatedRoute
  ) {
    let id=this.route.snapshot.paramMap.get('id')
    if(!isNaN(Number(id))) 
      this.obtenerSucursal(Number(id))
  }

  obtenerSucursal(id:any){ 
    this.gService 
    .get('sucursal',id) 
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

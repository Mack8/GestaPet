import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';

@Component({
  selector: 'app-producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css'
})
export class ProductoDetailComponent {

  datos: any;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private gService: GenericService,
    private route:ActivatedRoute
  ) {
    let id=this.route.snapshot.paramMap.get('id')
    if(!isNaN(Number(id))) 
      this.obtenerProducto(Number(id))
  }

  obtenerProducto(id:any){ 
    this.gService 
    .get('producto',id) 
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

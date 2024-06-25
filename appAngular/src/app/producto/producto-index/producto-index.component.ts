import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GenericService } from '../../share/generic.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrl: './producto-index.component.css'
})
export class ProductoIndexComponent {

  datos:any
  lGeneros:any
  destroy$: Subject<boolean>=new Subject<boolean>();
  filtro:string=""
  generos:any
  filterDatos:any

  constructor(private gService: GenericService,
    private router: Router
  ) {
    this.listProductos()
  }
  //Listar todos los videojuegos del API
  listProductos(){
    //localhost:3000/videojuego
    this.gService.list("producto/")
    .pipe(takeUntil(this.destroy$))
    .subscribe((respuesta:any)=>{
      console.log(respuesta)
      this.datos=respuesta
    })
  }

  detalle(id:number){
    this.router.navigate(['/producto',id])
  }
  


  ngOnDestroy(){
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


}

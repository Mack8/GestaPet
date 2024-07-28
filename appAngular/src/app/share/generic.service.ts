import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  // URL del API, definida en enviroments->enviroment.ts
  urlAPI: string = environment.apiURL;
  //Información usuario actual
  currentUser: any;

  private miArrayHorario: any[] = []; // Aquí puedes definir tu arreglo inicial
  private arraySubjectHorario = new BehaviorSubject<any[]>(null);
  public arrayHorario$ = this.arraySubjectHorario.asObservable();

  private arraySubjectBloqueo = new BehaviorSubject<any[]>(null);
  public arrayBloqueo$ = this.arraySubjectHorario.asObservable();

  //Inyectar cliente HTTP para las solicitudes al API
  constructor(private http: HttpClient) {
   this.arraySubjectHorario =  new BehaviorSubject<any[]>( JSON.parse(localStorage.getItem('horario')));
   this.arrayHorario$ = this.arraySubjectHorario.asObservable();

   this.arraySubjectBloqueo =  new BehaviorSubject<any[]>( JSON.parse(localStorage.getItem('bloqueo')));
   this.arrayBloqueo$ = this.arraySubjectBloqueo.asObservable();
  }
 
  // Listar
  //http://localhost:3000/videojuego
  list(endopoint: string): Observable<any> {
    return this.http.get<any>(this.urlAPI + endopoint);
  }
  // Obtener
  get(endopoint: string, filtro: any): Observable<any | any[]> {
    return this.http.get<any | any[]>(this.urlAPI + endopoint + `/${filtro}`);
  }
  // crear
  create(endopoint: string, objCreate: any | any): Observable<any | any[]> {
    return this.http.post<any | any[]>(this.urlAPI + endopoint, objCreate);
  }
  // actualizar
  update(endopoint: string, objUpdate: any | any): Observable<any | any[]> {
    return this.http.put<any | any[]>(
      this.urlAPI + endopoint + `/${objUpdate.id}`,
      objUpdate
    );
  }

   actualizarArrayHorario(nuevoArray: any[]): void {
    this.arraySubjectHorario.next(nuevoArray);
    localStorage.setItem('horario', JSON.stringify(this.arraySubjectHorario.getValue()));
  }
  

 get obtenerArrayHorario(){
    return this.arraySubjectHorario.getValue();
  
  }
   

  actualizarArrayBloque(nuevoArray: any[]): void {
    this.arraySubjectBloqueo.next(nuevoArray);
    localStorage.setItem('bloqueo', JSON.stringify(this.arraySubjectBloqueo.getValue()));
  }

  get obtenerArrayBloqueo() { 
    return this.arraySubjectHorario.getValue();
  }

}

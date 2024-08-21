import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../share/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isAuntenticated:boolean
  currentUser:any
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {
    //Obtener valor actual de la cantidad de items comprados
    
  }
  ngOnInit():void{
    this.authService.isAuthenticated.subscribe((valor)=>{
      this.isAuntenticated=valor
    })
    //Información usuario actual
    this.authService.decodeToken.subscribe((user:any)=>{
      this.currentUser=user
    })
  }
  login(){
    this.router.navigate(['usuario/login']);
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['inicio']);
  }
}
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-index',
  templateUrl: './usuario-index.component.html',
  styleUrl: './usuario-index.component.css'
})
export class UsuarioIndexComponent {
  constructor(
    private router: Router, 
    private route: ActivatedRoute) {
  

  }

  ngOnInit(): void {
    this.router.navigate(['/usuario/login'], { relativeTo: this.route });
  }
}

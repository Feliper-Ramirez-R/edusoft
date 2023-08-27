import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-web-main',
  templateUrl: './web-main.component.html',
  styleUrls: ['./web-main.component.scss']
})
export class WebMainComponent {

  iglesia:boolean = true;

  constructor(private router:Router){}

  inicio(){
    this.router.navigate(['/auth/login'])
  }

  cambiarPagina(){
    this.iglesia = !this.iglesia
  }

}

import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HomeProfesoresService } from './home-profesores.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-profesores',
  templateUrl: './home-profesores.component.html',
  styleUrls: ['./home-profesores.component.scss']
})
export class HomeProfesoresComponent {

  users_in_line: any[] = [];
  actividades_pendientes: any[] = [];

  constructor(protected user: AuthService,
    private homeProfService: HomeProfesoresService,
    private messageService: MessageService) { }

  ngOnInit() {
    // this.today = new Date().toISOString().split('T')[0];
   
  }

}

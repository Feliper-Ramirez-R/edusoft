import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HomeAlumnosService } from './home-alumnos.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-alumnos',
  templateUrl: './home-alumnos.component.html',
  styleUrls: ['./home-alumnos.component.scss']
})
export class HomeAlumnosComponent {

  users_in_line: any[] = [];
  actividades_pendientes: any[] = [];

  constructor(protected user: AuthService,
    private homeAlumService: HomeAlumnosService,
    private messageService: MessageService,
    private router: Router) { }


  ngOnInit() {
    // this.today = new Date().toISOString().split('T')[0];
    this.getUsersOnline();
    this.getActividades();
  }


  openMostrarCuestionario(actividad: any) {
    console.log(actividad);

    this.router.navigate(['/pages/cuestionario', actividad.id])
  }

  async getUsersOnline() {

    const valid: any = await this.homeAlumService.getUsersOnline();
    console.log(valid);

    if (!valid.error) {

      this.users_in_line = valid.data;

      if (valid.status == 200) {

        // this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return /* this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); */ }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

  async getActividades() {

    const valid: any = await this.homeAlumService.getActividades();
    console.log(valid);

    if (!valid.error) {

      this.actividades_pendientes = valid.penddings;

      if (valid.status == 200) {

        // this.messageService.add({ severity: 'success', summary: 'Bien!', detail: valid.message, life: 5000 });
      } else { return /* this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); */ }
    } else {
      if (valid.status != 500) { return /* this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); */ }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }


}

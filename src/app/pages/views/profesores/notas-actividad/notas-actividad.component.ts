import { Component } from '@angular/core';
import { NotasActividadService } from './notas-actividad.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-notas-actividad',
  templateUrl: './notas-actividad.component.html',
  styleUrls: ['./notas-actividad.component.scss']
})
export class NotasActividadComponent {

  actividad:any[] = [];
  filter: string = '';
  id_actividad:any

  constructor(private notasService: NotasActividadService,
    private messageService: MessageService,
    private router:Router,
    private route: ActivatedRoute,) { }


  ngOnInit() {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id_actividad = this.route.snapshot.paramMap.get('id');
    this.verNotasActividad()
  }



  async verNotasActividad() {

    const valid: any = await this.notasService.verNotasActividad(this.id_actividad);
    console.log(valid)

    if (!valid.error) {
       this.actividad = valid.data
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }
  }

}

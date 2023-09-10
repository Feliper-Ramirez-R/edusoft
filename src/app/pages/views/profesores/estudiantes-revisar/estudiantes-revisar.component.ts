import { Component } from '@angular/core';
import { EstudiantesRevisarService } from './estudiantes-revisar.service';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estudiantes-revisar',
  templateUrl: './estudiantes-revisar.component.html',
  styleUrls: ['./estudiantes-revisar.component.scss']
})
export class EstudiantesRevisarComponent {

  estudiantes:any[]=[];
  actividadNumero:any;


  constructor(private estudiantesService: EstudiantesRevisarService,
    private user: AuthService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    
    this.actividadNumero = this.route.snapshot.paramMap.get('id');
    console.log(this.actividadNumero);
    this.getEstudiantes();
  }


  onGlobalFilter(table: any, event: Event) {
    console.log(table, 'table', event, 'event');

    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

   openRevisarArchivo(actividad: any) {
    console.log(actividad);

    this.router.navigate(['/pages/revisarArchivo',actividad.activity_id+','+actividad.user_id])
  }


   openRevisar(actividad: any) {
    console.log(actividad);

    this.router.navigate(['/pages/revisar',actividad.activity_id+','+actividad.user_id])
  }


  async getEstudiantes() {

    const valid: any = await this.estudiantesService.getEstudiantes(this.actividadNumero);
    console.log(valid);
    if (!valid.error) {
      this.estudiantes = valid.data;
     
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrió un error!', life: 5000 }); }
    }

  }

}

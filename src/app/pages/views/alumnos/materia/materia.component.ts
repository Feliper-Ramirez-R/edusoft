import { Component } from '@angular/core';
import { MateriaService } from './materia.service';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-materia',
  templateUrl: './materia.component.html',
  styleUrls: ['./materia.component.scss']
})
export class MateriaComponent {

  idMateria: any
  options: MenuItem[] = [];
  actividades: any[] = [];
  totalActividades:any = 0;
 

  constructor(private materiaService: MateriaService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  ngOnInit() {

    console.log(this.route.snapshot.paramMap.get('id'));
    this.idMateria = this.route.snapshot.paramMap.get('id');
    this.getActividades()
    this.options = [
      {
        label: 'Profesor', icon: 'pi pi-user', command: () => {

        }
      },
      {
        label: 'Calificaciones', icon: 'pi pi-table', command: () => {

        }
      }
    ];
  }

  

  openMostrarCuestionario(actividad: any) {
    console.log(actividad);
    
    this.router.navigate(['/pages/cuestionario',actividad.id])
   
   
    // this.MostrarCuestionario = actividad.questions
  }


  async getActividades() {


    const valid: any = await this.materiaService.getActividades(this.idMateria);
    console.log(valid)

    if (!valid.error) {

/* ordenar las semanas */
        valid.weeks.sort(function (a: any, b: any) {
          if (a.week < b.week) {
            return 1;
          }
          if (a.week > b.week) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
  
      this.actividades = valid.weeks
      this.totalActividades = valid.count
      if (valid.status == 200) {

      } else { return this.messageService.add({ severity: 'info', summary: 'Info!', detail: valid.message, life: 5000 }); }
    } else {
      if (valid.status != 500) { return this.messageService.add({ severity: 'info', summary: 'Ups!', detail: valid.error.message, life: 5000 }); }
      else { this.messageService.add({ severity: 'error', summary: 'Ups!', detail: 'Ocurrio un error!', life: 5000 }); }
    }
  }

}
